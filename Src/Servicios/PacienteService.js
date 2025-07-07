import api from "./conexion";

export const listarPacientes = async () => {
    try {
        const response = await api.get('/listarPacientes');
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al listar los pacientes:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message: "Error de conexión",
        };
    }
};

export const eliminarPaciente = async (id) => {
    try {
        await api.delete(`/eliminarPacientes/${id}`);
        return { success: true };
    } catch (error) {
        console.error(
            "Error al eliminar el paciente:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const crearPaciente = async (data) => {
    try {
        const response = await api.post('/crearPacientes', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear el paciente:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const editarPaciente = async (id, data) => {
    try {
        const response = await api.put(`/editarPacientes/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar el paciente:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};