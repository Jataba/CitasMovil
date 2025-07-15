import { useEffect, useState } from "react";
import {View,Text,FlatList,StyleSheet,Alert,ActivityIndicator,TouchableOpacity,} from "react-native";
import PacienteCard from "../../components/PacienteCard";
import { useNavigation } from "@react-navigation/native";
import {listarPacientes,eliminarPaciente,} from "../../Src/Servicios/PacienteService";


/**
 * Pantalla para listar y gestionar pacientes.
 * 
 * Funcionalidades:
 * - Muestra lista de pacientes registrados
 * - Permite crear, editar y eliminar pacientes
 * - Actualización automática al enfocar la pantalla
 * - Manejo de estados de carga
 */
export default function ListarPaciente() {
const [paciente, setPacientes] = useState([]);
const [loading, setLoading] = useState(true);
const navigation = useNavigation();

const handlePacientes = async () => {
    setLoading(true);
    try {
        const result = await listarPacientes();
    if (result.success) {
        setPacientes(result.data);
    } else {
        Alert.alert(
            "Error",
            result.message || "No se pudieorn cargar los pacientes"
        );
    }
    } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los pacientes");
    } finally {
        setLoading(false);
    }
};
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", handlePacientes);
        return unsubscribe;
    }, [navigation]);

const handleEliminar = (id) => {
    Alert.alert(
        "Eliminar paciente",
        "¿Estas seguro que deseas elimina el paciente?",
        [
            { text: "cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
            onPress: async () => {
                try {
                    const result = await eliminarPaciente(id);
                if (result.success) {
                    // setActividades(actividades.filter((a) => a.id !== id));
                    handlePacientes();
                } else {
                    Alert.alert(
                        "Error",
                        result.message || "no se pudo eliminar el paciente"
                    );
                }
                } catch (error) {
                    Alert.alert("Error", "no se pudo elimianr el paciente");
                }
            },
            },
        ]
    );
};

const handleEditar = (paciente) => {
    navigation.navigate("EditarPaciente", { paciente });
};

const handleCrear = () => {
    navigation.navigate("EditarPaciente");
};

if (loading) {
    <View>
    <ActivityIndicator size="large" color="#1976D2" />
    </View>;
}

return (
    <View style={{ flex: 1 }}>
    <FlatList
        data={paciente}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <PacienteCard
            paciente={item}
            onEdit={() => handleEditar(item)} //accion editar
            onDelete={() => handleEliminar(item.id)} //accion eliminar
        />
        )}
        ListEmptyComponent={<Text>No hay pacientes Registrados.</Text>}
    />

    <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
        <Text style={styles.textBoton}>+ Nuevo Paciente</Text>
    </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
},
    info: {
    flex: 1,
},
nombre: {
    fontSize: 18,
    fontWeight: "bold",
},
detalle: {
    fontSize: 14,
    color: "#555",
},
actions: {
    flexDirection: "row",
},
iconBtn: {
    marginLeft: 10,
},
button: {
    backgroundColor: "#1976D2",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
},
buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
},

botonCrear: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 5,
},
});
