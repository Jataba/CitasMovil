import api from "./conexion";

/**
 * Función para obtener el listado de citas del usuario
 * 
 * Funcionalidades:
 * - Realiza una petición al servidor para obtener todas las citas del usuario autenticado
 * - Devuelve los datos de las citas en formato estructurado
 * - Maneja posibles errores de conexión o del servidor
 * - Proporciona feedback claro en caso de errores
 */
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
/**
 * Función para eliminar una cita específica del sistema
 * 
 * Funcionalidades:
 * - Envía una solicitud al servidor para eliminar una cita mediante su ID
 * - Maneja la respuesta exitosa de eliminación
 * - Gestiona errores de conexión o validación del servidor
 * - Proporciona mensajes de error específicos para facilitar el diagnóstico
 */
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

/**
 * Función para crear una nueva cita en el sistema
 * 
 * Funcionalidades:
 * - Registra una nueva cita con todos los datos requeridos
 * - Maneja la respuesta exitosa devolviendo los datos de la cita creada
 * - Gestiona errores de validación y conexión con el servidor
 * - Proporciona mensajes de error claros para facilitar la corrección
 */
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

/**
 * Función para actualizar los datos de una cita existente
 * 
 * Funcionalidades:
 * - Actualiza una cita específica identificada por su ID
 * - Permite modificar parcial o totalmente la información de la cita
 * - Maneja correctamente las respuestas exitosas y los errores
 * - Proporciona retroalimentación detallada en caso de fallos
 */
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