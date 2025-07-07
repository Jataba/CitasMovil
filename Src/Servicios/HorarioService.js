import api from "./conexion";

export const listarHorarios = async () => {
    try {
        const response = await api.get('/listarHorariomedicos');
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al listar los horarios de los medicos:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message: "Error de conexión",
        };
    }
};

export const eliminarHorario = async (id) => {
    try {
        await api.delete(`/eliminarHorariomedicos/${id}`);
        return { success: true };
    } catch (error) {
        console.error(
            "Error al eliminar el horario del medico:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const crearHorario = async (data) => {
    try {
        const response = await api.post('/crearHorariomedicos', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear el horario del medico:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const editarHorario = async (id, data) => {
    try {
        const response = await api.put(`/editarHorariomedicos/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar el horario del medico:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};