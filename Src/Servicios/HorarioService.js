import api from "./conexion";

/**
 * Función para obtener el listado de horarios médicos
 * 
 * Funcionalidades:
 * - Consulta y recupera todos los horarios médicos registrados
 * - Devuelve un listado completo con los horarios disponibles
 * - Cada horario incluye: médico, días, horas y estado
 * - Detecta y gestiona errores de conexión o del servidor
 * - Proporciona mensajes de error claros para el usuario
 */
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

/**
 * Función para eliminar un horario médico específico
 * 
 * Funcionalidades:
 * - Elimina un horario médico mediante su ID único
 * - Realiza una petición DELETE al endpoint correspondiente
 * - Gestiona errores de conexión o validación del servidor
 * - Proporciona mensajes de error específicos según el tipo de fallo
 */
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

/**
 * Función para registrar un nuevo horario médico
 * 
 * Funcionalidades:
 * - Crea un nuevo horario médico con los datos proporcionados
 * - Envía la información al servidor mediante petición POST
 * - Devuelve los datos completos del horario creado
 * - Valida y maneja errores en el proceso de creación
 * - Proporciona mensajes claros en caso de fallos
 */
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

/**
 * Función para actualizar un horario médico existente
 * 
 * Funcionalidades:
 * - Modifica los datos de un horario médico específico mediante su ID
 * - Permite actualizar parcial o completamente la información del horario
 * - Envía los cambios al servidor mediante petición PUT
 * - Retorna los datos actualizados del horario en caso de éxito
 * - Maneja errores de validación y conexión de forma adecuada
 */
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