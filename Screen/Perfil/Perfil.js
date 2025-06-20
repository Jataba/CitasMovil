import {View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native"
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent";
import api from "../../Src/Servicios/conexion";
import { LogoutUser } from "../../Src/Servicios/AuthService";


export default function Perfil (){
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    console.log("No se encontró el token, redirigiendo al login...");
                    return;
                }
                console.log("Intentando cargar perfil con token:", token);
                const response = await api.get("/traerDatos");
                console.log("Respuesta del perfil:", response.data);
                setUsuario(response.data);    
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                
                if (error.isAuthError || error.shouldRedirectToLogin) {
                    console.log("Error de autenticacion manejado por interceptor, redirigiendo automaticamente...");
                    return;
                }
                if (error.respone) {
                    console.log("Error response:", error.response.status, error.response.data);
                    Alert.alert(
                        "Error del servidor",
                        `Error ${error.response.status}: ${error.response.data.message || "Ocurrio un error al cargar el perfil"}`,
                        [
                            {
                                text: "Ok",
                                onPress: async () => {
                                    await AsyncStorage.removeItem('userToken');
                                    //El AppNavegacion se encargará de redirigir automaticamente
                                }
                            }
                        ]
                    );
                } else if (error.request) {
                    Alert.alert(
                        "Error de conexion",
                        "No se pudo conectar al servidor. Por favor, verifica tu conexión a internet.",
                        [
                            {
                                text: "Ok",
                                onPress: async () => {
                                    await AsyncStorage.removeItem('userToken');
                                    //El AppNavegacion se encargará de redirigir automaticamente
                                }
                            }
                        ]
                    )
                } else {
                    Alert.alert(
                        "Error",
                        "Ocurrio un error inesperado al cargar el perfil.",
                        [
                            {
                                text: "Ok",
                                onPress: async () => {
                                    await AsyncStorage.removeItem('userToken');
                                    //El AppNavegacion se encargará de redirigir automaticamente
                                }
                            }
                        ]
                    );
                }
            } finally {
                setLoading(false);
            }
        };
        cargarPerfil();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007B8C" />
            </View>
        );
    }

    if (!usuario) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.title}>Perfil de Usuario</Text>
                <View style={styles.ContainerPerfil}>
                    <Text style={styles.errorText}>
                        No se pudo cargar la informacion del perfil.
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de Usuario</Text>
            <View style={styles.ContainerPerfil}>
                <Text style={styles.prtofileText}>Nombre: {usuario.user.name || "No disponible"}</Text>
                <Text style={styles.prtofileText}>Email: {usuario.user.email || "No disponible"}</Text>
                <BottonComponent title="Editar Perfil" onPress={() => {}}/>
                <BottonComponent
                title="Cerrar Sesión"
                onPress={async () => {
                await LogoutUser();
                   // el appNavegacion se encargara de redirigir automaticamente
                }}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    ContainerPerfil: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    profileText: {
        fontSize: 18,
        marginBottom: 10,
        color: "#333",
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginBottom: 20,
    },
});
