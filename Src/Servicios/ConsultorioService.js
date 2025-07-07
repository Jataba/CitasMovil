import api from "./conexion";

export const listarConsultorios = async () => {
    try {
        const response = await api.get('/listarConsultorios');
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al listar los consultorios:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message: "Error de conexión",
        };
    }
};

export const eliminarConsultorio = async (id) => {
    try {
        await api.delete(`/eliminarConsultorios/${id}`);
        return { success: true };
    } catch (error) {
        console.error(
            "Error al eliminar el consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const crearConsultorio = async (data) => {
    try {
        const response = await api.post('/crearConsultorios', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear el consultorio:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const editarConsultorio = async (id, data) => {
    try {
        const response = await api.put(`/editarConsultorios/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar el consultorio:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};