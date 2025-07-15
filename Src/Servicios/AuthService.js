import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

/**
 * Función para autenticar usuarios en el sistema
 * 
 * Funcionalidades:
 * - Envía credenciales (email y contraseña) al servidor para autenticación
 * - Almacena el token de autenticación recibido en AsyncStorage
 * - Maneja respuestas exitosas y errores del servidor
 * - Proporciona feedback claro en caso de errores (validación o conexión)
 */
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        const { token } = response.data;

        await AsyncStorage.setItem('userToken', token);

        return { success: true, token };
    } catch (error) {
        console.error(
            "Error al iniciar sesión:",
            error.response ? error.response.data : error.message    
        );
        return {
            success: false,
            message: error.response
            ? error.response.data.message
            : "Error al conectar",
        };
    }
};

/**
 * Función para cerrar sesión de usuario en el sistema
 * 
 * Funcionalidades:
 * - Realiza una petición al servidor para invalidar la sesión actual
 * - Elimina el token de autenticación almacenado en AsyncStorage
 * - Maneja tanto el cierre de sesión exitoso como posibles errores
 * - Proporciona feedback claro en caso de errores (conexión o del servidor)
 */
export const LogoutUser = async () => {
    try {
        await api.get('/cerrar');
        await AsyncStorage.removeItem('userToken');
        return { success: true };
    } catch (error) {
        console.error(
            "Error al cerrar sesión:",
            error.response ? error.response.data : error.message
        );
        return{
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al cerrar sesión",
        };
    }
};

/**
 * Función para registrar nuevos usuarios en el sistema
 * 
 * Funcionalidades:
 * - Envía los datos del usuario (nombre, email, rol, teléfono, dirección y contraseña) al servidor
 * - Almacena automáticamente el token de autenticación recibido en AsyncStorage
 * - Maneja el registro exitoso y posibles errores de validación o conexión
 * - Proporciona feedback detallado en caso de errores
 */
export const registerUser = async (name, email, rol, telefono, direccion, password) => {
    try {
        const response = await api.post('/registrar', {
            name,
            email,
            rol,
            telefono,
            direccion,
            password
        });
        const { token } = response.data;

        await AsyncStorage.setItem('userToken', token);

        return { success: true, token };
    } catch (error) {
        console.error(
            "Error al registrar usuario:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al conectar",
        };
    }
}

/**
 * Función para actualizar la información del perfil de usuario
 * 
 * Funcionalidades:
 * - Envía los datos actualizados del usuario al servidor
 * - Maneja la respuesta exitosa del servidor con los nuevos datos del perfil
 * - Gestiona errores de conexión o validación del servidor
 * - Proporciona mensajes de error claros para facilitar la depuración
 */
export const actualizarPerfil = async (data) => {
    try {
        const response = await api.put('/actualizarPerfil', data);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Error al actualizar perfil:", error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Error al conectar con el servidor",
        };
    }
};