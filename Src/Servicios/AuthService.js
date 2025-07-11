import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

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