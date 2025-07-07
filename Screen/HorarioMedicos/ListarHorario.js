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
import {
    listarHorarios,
    eliminarHorario,
    editarHorario,
} from "../../Src/Servicios/HorarioService";
import { listarMedicos } from "../../Src/Servicios/MedicoService";
import HorarioCard from "../../components/HorarioCard";

export default function ListarHorario() {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const cargarDatos = async () => {
        setLoading(true);
        try {
            const [resultHorarios, resultMedicos] = await Promise.all([
                listarHorarios(),
                listarMedicos(),
            ]);

            if (resultHorarios.success && resultMedicos.success) {
                const horariosConNombre = resultHorarios.data.map((horario) => {
                    const medico = resultMedicos.data.find((m) => m.id === horario.idMedico);
                    return {
                        ...horario,
                        nombreMedico: medico ? medico.nombre : "Médico no encontrado",
                    };
                });

                setHorarios(horariosConNombre);
            } else {
                Alert.alert("Error", "No se pudieron cargar los datos correctamente.");
            }
        } catch (error) {
            Alert.alert("Error", "Ocurrió un error al cargar los horarios.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", cargarDatos);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar horario",
            "¿Estás seguro que deseas eliminar el horario?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarHorario(id);
                            if (result.success) {
                                cargarDatos();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el horario");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el horario");
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

    const actualizarMedicoEnHorario = async (horarioId, nuevoIdMedico) => {
        const horario = horarios.find((h) => h.id === horarioId);
        if (!horario) return;

        try {
            const result = await editarHorario(horarioId, {
                ...horario,
                idMedico: nuevoIdMedico,
            });

            if (result.success) {
                cargarDatos(); // Refresca la lista
            } else {
                Alert.alert("Error", result.message || "No se pudo actualizar el médico");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar el médico");
        }
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
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay horarios registrados.</Text>}
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
