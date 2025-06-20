import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent";
import api from "../../Src/Servicios/conexion";
import { LogoutUser } from "../../Src/Servicios/AuthService";

export default function Perfil() {
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
                if (error.response) {
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

    const handleEditProfile = () => {
        Alert.alert('Editar Perfil', 'Funcionalidad de edición de perfil');
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007B8C" />
            </View>
        );
    }

    if (!usuario) {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.title}>Perfil de Usuario</Text>
                    <View style={styles.ContainerPerfil}>
                        <Text style={styles.errorText}>
                            No se pudo cargar la informacion del perfil.
                        </Text>
                        <BottonComponent
                            title="Cerrar Sesión"
                            onPress={async () => {
                                await LogoutUser();
                                // el appNavegacion se encargara de redirigir automaticamente
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Image 
                    source={usuario.user.image ? { uri: usuario.user.image } : require('../../assets/12.jpg')} 
                    style={styles.avatar}
                />
                <Text style={styles.userName}>{usuario.user.name || "Usuario"}</Text>
                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Ionicons name="create-outline" size={20} color="#fff" />
                    <Text style={styles.editButtonText}>Editar Perfil</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Información de Contacto</Text>
                <View style={styles.infoItem}>
                    <Ionicons name="mail-outline" size={20} color="#555" style={styles.infoIcon} />
                    <Text style={styles.infoText}>{usuario.user.email || "No disponible"}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Ionicons name="call-outline" size={20} color="#555" style={styles.infoIcon} />
                    <Text style={styles.infoText}>{usuario.user.phone || "No disponible"}</Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Detalles de la Cuenta</Text>
                <View style={styles.infoItem}>
                    <Ionicons name="calendar-outline" size={20} color="#555" style={styles.infoIcon} />
                    <Text style={styles.infoText}>
                        Miembro desde: {usuario.user.createdAt ? new Date(usuario.user.createdAt).toLocaleDateString() : "Fecha no disponible"}
                    </Text>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => Alert.alert('Ver Citas', 'Navegar a historial de citas.')}
            >
                <Ionicons name="clipboard-outline" size={22} color="#fff" style={styles.actionButtonIcon} />
                <Text style={styles.actionButtonText}>Ver Mis Citas</Text>
            </TouchableOpacity>

            <BottonComponent
                title="Cerrar Sesión"
                onPress={async () => {
                    await LogoutUser();
                    // el appNavegacion se encargara de redirigir automaticamente
                }}
                style={styles.logoutButton}
            />
            
            <View style={{ height: 20 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    profileHeader: {
        backgroundColor: '#1976d2',
        padding: 20,
        alignItems: 'center',
        paddingTop: 50,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#fff',
        marginBottom: 15,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0056b3', 
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 5,
    },
    infoSection: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 5,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoIcon: {
        marginRight: 10,
        color: '#555',
    },
    infoText: {
        fontSize: 16,
        color: '#333',
    },
    actionButton: {
        backgroundColor: '#28a745',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 10,
        shadowColor: '#28a745',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    actionButtonIcon: {
        marginRight: 10,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: '#dc3545',
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
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginBottom: 20,
    },
});