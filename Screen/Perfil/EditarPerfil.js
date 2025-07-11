import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { actualizarPerfil } from "../../Src/Servicios/AuthService"; // servicio externo

export default function EditarPerfil({ route, navigation }) {
  const { user } = route.params;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [telefono, setTelefono] = useState(user.telefono || "");
  const [direccion, setDireccion] = useState(user.direccion || "");

  const [imagen, setImagen] = useState(
    user.imagen ? `http://172.30.1.139:8000/storage/imagenes/usuarios/${user.imagen}` : null
  );
  const [imagenBase64, setImagenBase64] = useState(null);

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso requerido", "Se necesita permiso para acceder a tus imágenes.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;
      const base64 = resultado.assets[0].base64;
      setImagen(uri);
      setImagenBase64(base64);
    }
  };

  const handleActualizar = async () => {
    const payload = {
      name,
      email,
      telefono,
      direccion,
    };

    if (imagenBase64) {
      payload.imagen = imagenBase64;
    }

    const response = await actualizarPerfil(payload);

    if (response.success) {
      Alert.alert("Éxito", "Perfil actualizado correctamente", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert("Error", response.message || "Error al actualizar");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {imagen && (
        <Image
          source={{ uri: imagen }}
          style={styles.avatar}
        />
      )}

      <Pressable style={[styles.button, { backgroundColor: "#007bff" }]} onPress={seleccionarImagen}>
        <Text style={styles.buttonText}>Cambiar Imagen</Text>
      </Pressable>

      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nombre" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Correo" keyboardType="email-address" />
      <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} placeholder="Teléfono" keyboardType="phone-pad" />
      <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} placeholder="Dirección" />

      <Pressable style={[styles.button, { backgroundColor: "#28a745" }]} onPress={handleActualizar}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
