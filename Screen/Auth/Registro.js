import { View, Text, TextInput, StyleSheet,Alert } from "react-native"
import BottonComponent from "../../components/BottonComponent"
import { useState } from "react";
import { registerUser } from "../../Src/Servicios/AuthService"; // Asegúrate de que la ruta sea correcta

export default function RegistroScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleRegister = async () => {
        setLoading(true);
        try {
            const result = await registerUser(name, email, rol, password, confirmarPassword);
            if (result.success) {
                Alert.alert("Éxito", "¡Bienvenido!", [
                    {
                        text: "OK",
                        onPress: () => {
                            console.log("Login exitoso, redirigiendo automaticamente...");
                        },
                    },
                ]);
            } else {
                Alert.alert(
                    "Error al registrarse",
                    result.message || "Ocurrio un error al registrarse"
                );
            }
        } catch (error) {
            console.error("Error inesperado al registrarse:", error);
            Alert.alert(
                "Error",
                "Ocurrió un error inesperado al intentar registrarse."
            );
        } finally {
            setLoading(false); //simepre desactiva el indecador de carga
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                value={name}
                onChangeText={setName}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Rol"
                value={rol}
                onChangeText={setRol}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                secureTextEntry
                value={confirmarPassword}
                onChangeText={setConfirmarPassword}
                editable={!loading}
            />
            <BottonComponent
                title="Registrarse"
                onPress={handleRegister}
            />
            <BottonComponent
                title="Iniciar Sesión"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
});