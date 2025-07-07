import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { crearHorario, editarHorario } from "../../Src/Servicios/HorarioService";
import { listarMedicos } from "../../Src/Servicios/MedicoService";

export default function EditarHorario() {
    const navigation = useNavigation();
    const route = useRoute();

    const horario = route.params?.horario;
    const [idMedico, setIdMedico] = useState(horario?.idMedico || "");
    const [dia_semana, setDia_semana] = useState(horario?.dia_semana || "");
    const [hora_inicio, setHora_inicio] = useState(horario?.hora_inicio || "");
    const [hora_fin, setHora_fin] = useState(horario?.hora_fin || "");
    const [loading, setLoading] = useState(false);
    const [medicos, setMedicos] = useState([]);

    const esEdicion = !!horario;

    useEffect(() => {
        const cargarMedicos = async () => {
            try {
                const result = await listarMedicos();
                if (result.success) {
                    setMedicos(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudieron cargar los médicos");
                }
            } catch (error) {
                Alert.alert("Error", "No se pudo cargar la lista de médicos");
            }
        };

        cargarMedicos();
    }, []);

    const handleGuardar = async () => {
        if (!idMedico || !dia_semana || !hora_inicio || !hora_fin) {
            Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarHorario(horario.id, { idMedico, dia_semana, hora_inicio, hora_fin });
            } else {
                result = await crearHorario({ idMedico, dia_semana, hora_inicio, hora_fin });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Horario actualizado correctamente" : "Horario creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Ocurrió un error al guardar el horario");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el horario. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar horario" : "Nuevo horario"}</Text>

            <Text style={styles.label}>Médico:</Text>
            {esEdicion ? (
                <Text style={styles.textoMedico}>
                    {medicos.find((m) => m.id === idMedico)?.nombre || "Médico no encontrado"}
                </Text>
            ) : (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={idMedico}
                        onValueChange={(itemValue) => setIdMedico(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccione un médico" value="" />
                        {medicos.map((medico) => (
                            <Picker.Item
                                key={medico.id}
                                label={`${medico.nombre} (${medico.especialidad})`}
                                value={medico.id}
                            />
                        ))}
                    </Picker>
                </View>
            )}

            <TextInput
                style={styles.input}
                placeholder="Día de la semana"
                value={dia_semana}
                onChangeText={setDia_semana}
            />
            <TextInput
                style={styles.input}
                placeholder="Hora de inicio"
                value={hora_inicio}
                onChangeText={setHora_inicio}
            />
            <TextInput
                style={styles.input}
                placeholder="Hora de fin"
                value={hora_fin}
                onChangeText={setHora_fin}
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Horario"}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    picker: {
        height: 50,
        width: "100%",
    },
    label: {
        marginBottom: 5,
        fontWeight: "bold",
    },
    textoMedico: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#eee",
        marginBottom: 15,
    },
    boton: {
        backgroundColor: "#1976D2",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
