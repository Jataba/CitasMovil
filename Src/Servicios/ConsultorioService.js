import api from "./conexion";

/**
 * Función para obtener el listado de consultorios disponibles
 * 
 * Funcionalidades:
 * - Realiza una petición GET al endpoint '/listarConsultorios'
 * - Devuelve un array con todos los consultorios registrados
 * - Cada consultorio incluye: id, nombre, ubicación y estado
 * - Maneja errores de conexión y del servidor
 * - Registra errores en consola para depuración
 */
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

/**
 * Función para eliminar un consultorio específico del sistema
 * 
 * Funcionalidades:
 * - Elimina un consultorio mediante su ID enviando petición DELETE al servidor
 * - Maneja la respuesta exitosa sin necesidad de datos adicionales
 * - Detecta y gestiona errores de conexión o del servidor
 * - Proporciona mensajes de error específicos para cada caso
 * - Registra los errores en consola para fines de depuración
 */
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

/**
 * Función para registrar un nuevo consultorio en el sistema
 * 
 * Funcionalidades:
 * - Crea un nuevo consultorio enviando los datos requeridos al servidor
 * - Recibe y devuelve los datos completos del consultorio creado
 * - Valida y maneja posibles errores en la creación
 * - Proporciona feedback claro en caso de errores (validación o conexión)
 * - Registra errores en consola para seguimiento técnico
 */
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


/**
 * Función para modificar los datos de un consultorio existente
 * 
 * Funcionalidades:
 * - Actualiza la información de un consultorio específico mediante su ID
 * - Permite editar parcial o completamente los datos del consultorio
 * - Envía los cambios al servidor mediante petición PUT
 * - Retorna los datos actualizados del consultorio en caso de éxito
 * - Maneja y notifica errores de validación o conexión
 * - Proporciona retroalimentación clara del resultado de la operación
 */
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