import {View, Text, TextInput, StyleSheet,
    TouchableOpacity, Alert, ActivityIndicator, 
    KeyboardAvoidingView,ScrollView,Platform,Keyboard,
    TouchableWithoutFeedback } from "react-native"    
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { crearPaciente, editarPaciente } from "../../Src/Servicios/PacienteService";


export default function EditarPaciente() {
    const navigation = useNavigation();
    const route = useRoute();

    const paciente = route.params?.paciente;
    const [nombre, setNombre] = useState(paciente?.nombre || "");
    const [email, setEmail] = useState(paciente?.email || "");
    const [documento, setDocumento] = useState(paciente?.documento || "");
    const [telefono, setTelefono] = useState(paciente?.telefono || "");
    const [fechaNacimiento, setFechaNacimiento] = useState(paciente?.fechaNacimiento || "");
    const [direccion, setDireccion] = useState(paciente?.direccion || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!paciente;

    const handleGuardar = async () => {
        if (!nombre || !email || !documento || !telefono || !fechaNacimiento || !direccion) {
            Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarPaciente(paciente.id, { nombre, email, documento, telefono, fechaNacimiento, direccion });
            } else {
                result = await crearPaciente({ nombre, email, documento, telefono, fechaNacimiento, direccion });
            }
            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Paciente actualizado correctamente" : "Paciente creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Ocurrió un error al guardar el paciente");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el paciente. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    }

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
                <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar paciente" : "Nuevo Paciente"}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del Paciente"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Email del Paciente"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Documento del Paciente"
                value={documento}
                onChangeText={setDocumento}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono del Paciente"
                value={telefono}
                onChangeText={setTelefono}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de Nacimiento"
                value={fechaNacimiento}
                onChangeText={setFechaNacimiento}
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección del Paciente"
                value={direccion}
                onChangeText={setDireccion}
            />
        
            <TouchableOpacity
                style={styles.boton} onPress={handleGuardar} disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Paciente"}</Text>
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
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 200, // Espacio extra para el teclado
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
    error: {
        color: "red",
        marginTop: 10,
        textAlign: "center",
    },
});
