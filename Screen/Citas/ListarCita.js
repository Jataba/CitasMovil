import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarCitas, eliminarCita } from "../../Src/Servicios/CitaService";
import { listarMedicos } from "../../Src/Servicios/MedicoService";
import { listarPacientes } from "../../Src/Servicios/PacienteService";
import { listarConsultorios } from "../../Src/Servicios/ConsultorioService";
import CitaCard from "../../components/CitaCard";


/**
 * Pantalla para listar y gestionar citas médicas.
 * 
 * Funcionalidades:
 * - Carga y muestra lista de citas con datos completos (médico, paciente, consultorio)
 * - Permite crear, editar y eliminar citas
 * - Actualización automática al enfocar la pantalla
 * - Manejo de estados de carga
 */
export default function ListarCitas() {
    const [citas, setCitas] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [consultorios, setConsultorios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleCitas = async () => {
        setLoading(true);
        try {
            const [resultCitas, resultMedicos, resultPacientes, resultConsultorios] = await Promise.all([
                listarCitas(),
                listarMedicos(),
                listarPacientes(),
                listarConsultorios()
            ]);

            if (resultCitas.success && resultMedicos.success && resultPacientes.success && resultConsultorios.success) {
                setMedicos(resultMedicos.data);
                setPacientes(resultPacientes.data);
                setConsultorios(resultConsultorios.data);

                // Mapear citas con nombres de relaciones
                const citasConNombres = resultCitas.data.map(cita => {
                    const medico = resultMedicos.data.find(m => m.id === cita.idMedico);
                    const paciente = resultPacientes.data.find(p => p.id === cita.idPaciente);
                    const consultorio = resultConsultorios.data.find(c => c.id === cita.idConsultorio);

                    return {
                        ...cita,
                        nombreMedico: medico ? `${medico.nombre} (${medico.especialidad})` : "Médico no asignado",
                        nombrePaciente: paciente ? `${paciente.nombre} (${paciente.documento})` : "Paciente no asignado",
                        nombreConsultorio: consultorio ? `${consultorio.nombre} (${consultorio.ubicacion})` : "Consultorio no asignado"
                    };
                });

                setCitas(citasConNombres);
            } else {
                Alert.alert("Error", "No se pudieron cargar los datos.");
            }
        } catch (error) {
            Alert.alert("Error", "Error al cargar citas o relaciones.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", handleCitas);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar cita",
            "¿Estás seguro?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
                            const result = await eliminarCita(id);
                            if (result.success) {
                                handleCitas();
                            } else {
                                Alert.alert("Error", result.message || "Error al eliminar.");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar.");
                        }
                    },
                },
            ]
        );
    };

    const handleEditar = (cita) => {
        navigation.navigate("EditarCita", { cita });
    };

    const handleCrear = () => {
        navigation.navigate("EditarCita");
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1976D2" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={citas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CitaCard
                        cita={item}
                        medicos={medicos}
                        pacientes={pacientes}
                        consultorios={consultorios}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay citas.</Text>}
                contentContainerStyle={{ padding: 16 }}
            />
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <Text style={styles.textBoton}>+ Nueva Cita</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    botonCrear: {
        backgroundColor: "#1976D2",
        padding: 15,
        borderRadius: 8,
        position: "absolute",
        bottom: 20,
        right: 20,
        elevation: 5,
    },
    textBoton: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#555",
    },
});