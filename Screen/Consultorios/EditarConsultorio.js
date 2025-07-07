import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native"    
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { crearConsultorio, editarConsultorio } from "../../Src/Servicios/ConsultorioService";

export default function EditarConsultorio() {
    const navigation = useNavigation();
    const route = useRoute();

    const consultorio = route.params?.consultorio;
    const [nombre, setNombre] = useState(consultorio?.nombre || "");
    const [ubicacion, setUbicacion] = useState(consultorio?.ubicacion || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!consultorio;

    const handleGuardar = async () => {
        if (!nombre || !ubicacion) {
            Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarConsultorio(consultorio.id, { nombre, ubicacion });
            } else {
                result = await crearConsultorio({ nombre, ubicacion });
            }
            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Consultorio actualizado correctamente" : "Consultorio creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Ocurrió un error al guardar el consultorio");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el consultorio. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Consultorio" : "Nuevo Consultorio"}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del Consultorio"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Ubicación del Consultorio"
                value={ubicacion}
                onChangeText={setUbicacion}
            />
        
            <TouchableOpacity
                style={styles.boton} onPress={handleGuardar} disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Consultorio"}</Text>
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
