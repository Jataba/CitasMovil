import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  useColorScheme,
  Animated,
  Pressable,
} from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState, useRef } from "react";
import { loginUser } from "../../Src/Servicios/AuthService";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const scheme = useColorScheme();
  const darkMode = scheme === "dark";
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

  const handleLogin = async () => {
    animateButton();
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "Inicio de sesión exitoso", [
          {
            text: "Ok",
            onPress: () => console.log("Login exitoso, redirigiendo..."),
          },
        ]);
      } else {
        Alert.alert(
          "Error de Login",
          result.message || "Ocurrió un error al iniciar sesión"
        );
      }
    } catch (error) {
      console.error("Error inesperado en login:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al intentar iniciar sesión.");
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
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <Text style={[styles.title, darkMode && styles.titleDark]}>Iniciar Sesión</Text>

      {renderInput("Correo Electrónico", email, setEmail, "mail-outline", false, "email-address")}
      {renderInput("Contraseña", password, setPassword, "lock-closed-outline", true)}

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable onPress={handleLogin} disabled={loading} style={styles.animatedButton}>
          <Text style={styles.animatedButtonText}>Ingresar</Text>
        </Pressable>
      </Animated.View>

      <BottonComponent
        title="¿No tienes una cuenta? Regístrate"
        onPress={() => navigation.navigate("Registro")}
        style={{ backgroundColor: "#43A047" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
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
});
