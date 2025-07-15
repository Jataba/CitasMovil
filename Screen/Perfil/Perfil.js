import { View, Text, StyleSheet, ActivityIndicator, Alert, Image } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent";
import api from "../../Src/Servicios/conexion";
import { useNavigation } from "@react-navigation/native";


/**
 * Pantalla de Perfil de Usuario
 * 
 * Funcionalidades:
 * - Muestra información detallada del usuario logueado
 * - Incluye foto de perfil, datos personales y rol
 * - Permite editar el perfil
 * - Maneja estados de carga y errores
 */
export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const BASE_URL = "http://172.30.1.139:8000";

  const cargarPerfil = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No se encontró el token, redirigiendo al login...");
        return;
      }

      const response = await api.get("/traerDatos");
      setUsuario(response.data);
    } catch (error) {
      console.error("Error al cargar el perfil:", error);
      Alert.alert("Error", "Ocurrió un error al cargar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      cargarPerfil();
    });

    return unsubscribe;
  }, [navigation]);

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
            No se pudo cargar la información del perfil.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <View style={styles.ContainerPerfil}>
        <Image
          source={{
            uri: `${BASE_URL}/storage/imagenes/usuarios/${usuario.user.imagen}`,
          }}
          style={styles.avatar}
        />

        <Text style={styles.profileText}>Nombre: {usuario.user.name}</Text>
        <Text style={styles.profileText}>Email: {usuario.user.email}</Text>
        <Text style={styles.profileText}>Rol: {usuario.user.rol}</Text>
        <Text style={styles.profileText}>
          Teléfono: {usuario.user.telefono ?? "No disponible"}
        </Text>
        <Text style={styles.profileText}>
          Dirección: {usuario.user.direccion ?? "No disponible"}
        </Text>

        <BottonComponent
          title="Editar Perfil"
          onPress={() => navigation.navigate("EditarPerfil", { user: usuario.user })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF0F6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF0F6",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2C3E50",
  },
  ContainerPerfil: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#3498db",
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#34495E",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 20,
  },
});
