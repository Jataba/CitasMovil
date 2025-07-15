import api from "./conexion";

/**
 * Función para listar pacientes
 * 
 * Funcionalidades:
 * - Obtiene lista completa de pacientes
 * - Maneja errores de conexión
 * - Devuelve datos o mensaje de error
 */
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

/**
 * Función para eliminar paciente
 * 
 * Funcionalidades:
 * - Elimina paciente por ID
 * - Maneja errores de servidor/conexión
 * - Retorna estado de operación
 */
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

/**
 * Función para crear paciente
 * 
 * Funcionalidades:
 * - Registra nuevo paciente
 * - Valida datos requeridos
 * - Maneja errores de validación/conexión
 * - Retorna datos del paciente creado
 */
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

/**
 * Función para editar paciente
 * 
 * Funcionalidades:
 * - Actualiza datos de paciente por ID
 * - Permite modificación parcial
 * - Maneja errores de validación/conexión
 * - Retorna datos actualizados
 */
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