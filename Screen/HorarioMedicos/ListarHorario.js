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
import { listarHorarios, eliminarHorario } from "../../Src/Servicios/HorarioService";
import { listarMedicos } from "../../Src/Servicios/MedicoService";
import HorarioCard from "../../components/HorarioCard";


/**
 * Pantalla para listar y gestionar horarios médicos.
 * 
 * Funcionalidades:
 * - Carga y muestra lista de horarios con nombres de médicos
 * - Permite crear, editar y eliminar horarios
 * - Muestra estado de carga
 */
export default function ListarHorario() {
    const [horarios, setHorarios] = useState([]);
    const [medicos, setMedicos] = useState([]); // Estado para almacenar los médicos
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleHorarios = async () => {
        setLoading(true);
        try {
            const [resultHorarios, resultMedicos] = await Promise.all([
                listarHorarios(),
                listarMedicos(), // Obtener médicos
            ]);

            if (resultHorarios.success && resultMedicos.success) {
                // Asignar los médicos a un estado
                setMedicos(resultMedicos.data);

                // Mapear horarios con el nombre del médico
                const horariosConNombre = resultHorarios.data.map((horario) => {
                    const medico = resultMedicos.data.find((m) => m.id === horario.idMedico);
                    return {
                        ...horario,
                        nombreMedico: medico ? `${medico.nombre} (${medico.especialidad})` : "Médico no asignado",
                    };
                });

                setHorarios(horariosConNombre);
            } else {
                Alert.alert("Error", "No se pudieron cargar los datos.");
            }
        } catch (error) {
            Alert.alert("Error", "Error al cargar horarios o médicos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", handleHorarios);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar horario",
            "¿Estás seguro?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
                            const result = await eliminarHorario(id);
                            if (result.success) {
                                handleHorarios();
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

    const handleEditar = (horario) => {
        navigation.navigate("EditarHorario", { horario });
    };

    const handleCrear = () => {
        navigation.navigate("EditarHorario");
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
                data={horarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <HorarioCard
                        horario={item}
                        medicos={medicos} // Pasar la lista de médicos
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay horarios.</Text>}
                contentContainerStyle={{ padding: 16 }}
            />
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <Text style={styles.textBoton}>+ Nuevo Horario</Text>
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