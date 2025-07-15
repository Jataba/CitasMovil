import api from "./conexion";

/**
 * Función para obtener el listado de médicos registrados
 * 
 * Funcionalidades:
 * - Consulta y recupera todos los médicos activos del sistema
 * - Maneja correctamente las respuestas del servidor
 * - Detecta y gestiona errores de conexión o del servidor
 * - Proporciona mensajes de error claros para el usuario
 */
export const listarMedicos = async () => {
    try {
        const response = await api.get('/listarMedicos');
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al listar los medicos:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message: "Error de conexión",
        };
    }
};


/**
 * Función para eliminar un médico del sistema
 * 
 * Funcionalidades:
 * - Elimina permanentemente un médico mediante su ID único
 * - Realiza una petición DELETE al endpoint correspondiente
 * - Maneja correctamente la respuesta exitosa del servidor
 * - Proporciona mensajes de error específicos según el fallo
 */
export const eliminarMedico = async (id) => {
    try {
        await api.delete(`/eliminarMedicos/${id}`);
        return { success: true };
    } catch (error) {
        console.error(
            "Error al eliminar el medico:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

/**
 * Función para registrar un nuevo médico en el sistema
 * 
 * Funcionalidades:
 * - Crea un nuevo registro médico con todos los datos requeridos
 * - Valida y envía la información mediante petición POST
 * - Maneja correctamente la respuesta del servidor
 * - Detecta y gestiona errores de validación o duplicados
 */
export const crearMedicos = async (data) => {
    try {
        const response = await api.post('/crearMedicos', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear el medico:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

/**
 * Función para actualizar la información de un médico registrado
 * 
 * Funcionalidades:
 * - Actualiza los datos de un médico existente mediante su ID
 * - Valida los cambios antes de enviarlos al servidor
 * - Maneja correctamente las respuestas exitosas
 * - Proporciona feedback claro del resultado
 * - Registra errores técnicos para diagnóstico
 * - Retorna objeto con estado y datos actualizados
 */
export const editarMedico = async (id, data) => {
    try {
        const response = await api.put(`/editarMedicos/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar el medico:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};