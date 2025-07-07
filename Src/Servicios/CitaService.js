import api from "./conexion";

export const listarCitas = async () => {
    try {
        const response = await api.get('/listarCitas');
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al listar las citas:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message: "Error de conexión",
        };
    }
};

export const eliminarCita = async (id) => {
    try {
        await api.delete(`/eliminarCitas/${id}`);
        return { success: true };
    } catch (error) {
        console.error(
            "Error al eliminar la cita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const crearCita = async (data) => {
    try {
        const response = await api.post('/crearCitas', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear la cita:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const editarCita = async (id, data) => {
    try {
        const response = await api.put(`/editarCitas/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar la cita:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};