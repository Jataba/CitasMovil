import { View, Text, TextInput, StyleSheet, 
    TouchableOpacity, Alert, ActivityIndicator,
    KeyboardAvoidingView,ScrollView,Platform,Keyboard,
    TouchableWithoutFeedback} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { listarPacientes } from "../../Src/Servicios/PacienteService";
import { listarConsultorios } from "../../Src/Servicios/ConsultorioService";
import { crearCita, editarCita } from "../../Src/Servicios/CitaService";
import { listarMedicos } from "../../Src/Servicios/MedicoService";

export default function EditarCita() {
    const navigation = useNavigation();
    const route = useRoute();

    const cita = route.params?.cita;
    const [idMedico, setIdMedico] = useState(cita?.idMedico || "");
    const [idPaciente, setIdPaciente] = useState(cita?.idPaciente || "");
    const [idConsultorio, setIdConsultorio] = useState(cita?.idConsultorio || "");
    const [fecha, setFecha] = useState(cita?.fecha || "");
    const [hora, setHora] = useState(cita?.hora || "");
    const [motivo, setMotivo] = useState(cita?.motivo || "");
    const [loading, setLoading] = useState(false);
    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [consultorios, setConsultorios] = useState([]);

    const esEdicion = !!cita;

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

    useEffect(() => {
        const cargarPacientes = async () => {
            try {
                const result = await listarPacientes();
                if (result.success) {
                    setPacientes(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudieron cargar los pacientes");
                }
            } catch (error) {
                Alert.alert("Error", "No se pudo cargar la lista de pacientes");
            }
        };
        cargarPacientes();
    }, []);
    
    useEffect(() => {
        const cargarConsultorios = async () => {
            try {
                const result = await listarConsultorios();
                if (result.success) {
                    setConsultorios(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudieron cargar los consultorios");
                }
            } catch (error) {
                Alert.alert("Error", "No se pudo cargar la lista de consultorios");
            }
        };
        cargarConsultorios();
    }, []);

    const handleGuardar = async () => {
        if (!idMedico || !idPaciente || !idConsultorio || !fecha || !hora || !motivo) {
            Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarCita(cita.id, { idMedico, idPaciente, idConsultorio, fecha, hora, motivo });
            } else {
                result = await crearCita({ idMedico, idPaciente, idConsultorio, fecha, hora, motivo });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Cita actualizada correctamente" : "Cita creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Ocurrió un error al guardar la cita");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la cita. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Text style={styles.title}>{esEdicion ? "Editar Cita" : "Nueva Cita"}</Text>

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
                        <Text style={styles.label}>Paciente:</Text>
                        {esEdicion ? (
                            <Text style={styles.textoMedico}>
                                {pacientes.find((p) => p.id === idPaciente)?.nombre || "Paciente no encontrado"}
                            </Text>
                        ) : (
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={idPaciente}
                                    onValueChange={(itemValue) => setIdPaciente(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Seleccione un paciente" value="" />
                                    {pacientes.map((paciente) => (
                                        <Picker.Item
                                            key={paciente.id}
                                            label={`${paciente.nombre} (${paciente.documento})`}
                                            value={paciente.id}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        )}
                        <Text style={styles.label}>Consultorio:</Text>
                        {esEdicion ? (
                            <Text style={styles.textoMedico}>
                                {consultorios.find((c) => c.id === idConsultorio)?.nombre || "Consultorio no encontrado"}
                            </Text>
                        ) : (
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={idConsultorio}
                                    onValueChange={(itemValue) => setIdConsultorio(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Seleccione un consultorio" value="" />
                                    {consultorios.map((consultorio) => (
                                        <Picker.Item
                                            key={consultorio.id}
                                            label={`${consultorio.nombre} (${consultorio.ubicacion})`}
                                            value={consultorio.id}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha de la cita (YYYY-MM-DD)"
                            value={fecha}
                            onChangeText={setFecha}
                            returnKeyType="next"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Hora de la cita (HH:MM)"
                            value={hora}
                            onChangeText={setHora}
                            returnKeyType="next"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Motivo de la cita"
                            value={motivo}
                            onChangeText={setMotivo}
                            returnKeyType="done"
                            onSubmitEditing={handleGuardar}
                            blurOnSubmit={true}
                        />

                        <TouchableOpacity 
                            style={styles.boton} 
                            onPress={handleGuardar} 
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Cita"}</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 200 // Espacio extra para el teclado
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
        marginTop: 10,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});