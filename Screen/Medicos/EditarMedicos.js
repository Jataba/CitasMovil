import {View, Text, TextInput, StyleSheet, 
    TouchableOpacity, Alert, ActivityIndicator, 
    KeyboardAvoidingView,ScrollView,Platform, Keyboard,
    TouchableWithoutFeedback } from "react-native"    
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { crearMedicos, editarMedico } from "../../Src/Servicios/MedicoService";


export default function EditarMedico() {
    const navigation = useNavigation();
    const route = useRoute();

    const medico = route.params?.medico;
    const [nombre, setNombre] = useState(medico?.nombre || "");
    const [email, setEmail] = useState(medico?.email || "");
    const [documento, setDocumento] = useState(medico?.documento || "");
    const [telefono, setTelefono] = useState(medico?.telefono || "");
    const [especialidad, setEspecialidad] = useState(medico?.especialidad || "");
    const [direccion, setDireccion] = useState(medico?.direccion || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!medico;

    const handleGuardar = async () => {
        if (!nombre || !email || !documento || !telefono || !especialidad || !direccion) {
            Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarMedico(medico.id, { nombre, email, documento, telefono, especialidad, direccion });
            } else {
                result = await crearMedicos({ nombre, email, documento, telefono, especialidad, direccion });
            }
            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Medico actualizado correctamente" : "Medico creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Ocurrió un error al guardar el medico");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el medico. Inténtalo más tarde.");
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
            <Text style={styles.title}>{esEdicion ? "Editar medico" : "Nuevo medico"}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del Medico"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Email del Medico"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Documento del Medico"
                value={documento}
                onChangeText={setDocumento}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono del Medico"
                value={telefono}
                onChangeText={setTelefono}
            />
            <TextInput
                style={styles.input}
                placeholder="Especialidad del Medico"
                value={especialidad}
                onChangeText={setEspecialidad}
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección del Medico"
                value={direccion}
                onChangeText={setDireccion}
            />
        
            <TouchableOpacity
                style={styles.boton} onPress={handleGuardar} disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Medico"}</Text>
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
