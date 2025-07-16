import {View,Text,TextInput,StyleSheet,Alert,useColorScheme,Pressable,Animated,KeyboardAvoidingView,ScrollView,Platform, Keyboard,TouchableWithoutFeedback} from "react-native";
import { useState, useRef } from "react";
import { registerUser } from "../../Src/Servicios/AuthService";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";



/**
 * Pantalla de registro de usuario con validación de campos.
 * 
 * Funcionalidades:
 * - Formulario con campos: nombre, email, rol, teléfono, dirección y contraseña
 * - Validación de contraseña y confirmación
 * - Animación al pulsar el botón de registro
 * - Redirección a pantalla de login
 * - Teclado adaptable
 */
export default function RegistroScreen({ navigation }) {
    const scheme = useColorScheme(); // Detecta si es oscuro o claro
    const darkMode = scheme === "dark";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");


    const scaleAnim = useRef(new Animated.Value(1)).current;

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleRegister = async () => {
        animateButton();
        setLoading(true);
        try {
            const result = await registerUser(name, email, rol, telefono, direccion, password, confirmarPassword);
            if (result.success) {
                Alert.alert("Éxito", "¡Bienvenido!", [
                    {
                        text: "OK",
                        onPress: () => console.log("Login exitoso"),
                    },
                ]);
            } else {
                Alert.alert("Error", result.message || "Ocurrió un error al registrarse");
            }
        } catch (error) {
            console.error("Error inesperado:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al intentar registrarse.");
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (placeholder, value, onChangeText, icon, secure = false, keyboard = "default") => (
        <View style={[styles.inputContainer, darkMode && styles.inputContainerDark]}>
            <Ionicons name={icon} size={20} color={darkMode ? "#ccc" : "#888"} style={styles.icon} />
            <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                placeholder={placeholder}
                placeholderTextColor={darkMode ? "#aaa" : "#999"}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secure}
                keyboardType={keyboard}
                autoCapitalize="none"
                editable={!loading}
            />
        </View>
    );

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
                            <View style={[styles.container, darkMode && styles.containerDark]}>
                                <Text style={[styles.title, darkMode && styles.titleDark]}>Registro</Text>

                                {renderInput("Nombre Completo", name, setName, "person-outline")}
                                {renderInput("Correo Electrónico", email, setEmail, "mail-outline", false, "email-address")}
                                {renderInput("Teléfono", telefono, setTelefono, "call-outline", false, "phone-pad")}
                                {renderInput("Dirección", direccion, setDireccion, "location-outline")}
                                {renderInput("Contraseña", password, setPassword, "lock-closed-outline", true)}
                                {renderInput("Confirmar Contraseña", confirmarPassword, setConfirmarPassword, "lock-closed-outline", true)}
                                <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={rol}
                                    onValueChange={(itemValue) => setRol(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Selecciona un rol" value="" />
                                    <Picker.Item label="recepcionista" value="recepcionista" />
                                    <Picker.Item label="admin" value="admin"/>
                                    <Picker.Item label="doctor" value="doctor" />
                                </Picker>
                            </View>
                                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                                    <Pressable onPress={handleRegister} disabled={loading} style={styles.animatedButton}>
                                        <Text style={styles.animatedButtonText}>Registrarse</Text>
                                    </Pressable>
                                </Animated.View>

                                <Pressable onPress={() => navigation.navigate("Login")}>
                                    <Text style={[styles.loginText, darkMode && styles.loginTextDark]}>
                                        ¿Ya tienes una cuenta? Inicia sesión
                                    </Text>
                                </Pressable>
                            </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f0f4f8",
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 200, // Espacio extra para el teclado
    },
    containerDark: {
        backgroundColor: "#121212",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "#333",
    },
    titleDark: {
        color: "#fff",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    inputContainerDark: {
        backgroundColor: "#1e1e1e",
        borderColor: "#333",
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 50,
        color: "#333",
    },
    inputDark: {
        color: "#fff",
    },
    animatedButton: {
        backgroundColor: "#1e90ff",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    animatedButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginText: {
        textAlign: "center",
        color: "#1e90ff",
        textDecorationLine: "underline",
    },
    loginTextDark: {
        color: "#90caff",
    },
    pickerContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
    },
});
