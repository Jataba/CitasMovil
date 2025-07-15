import { useEffect, useState } from "react";
import {View,Text,FlatList,StyleSheet,Alert,ActivityIndicator,TouchableOpacity,} from "react-native";
import MedicoCard from "../../components/MedicoCard";
import { useNavigation } from "@react-navigation/native";
import {listarMedicos,eliminarMedico,} from "../../Src/Servicios/MedicoService";


/**
 * Pantalla para listar y gestionar médicos.
 * 
 * Funcionalidades:
 * - Carga y muestra lista de médicos registrados
 * - Permite crear, editar y eliminar médicos
 * - Actualización automática al volver a la pantalla
 * - Manejo de estados de carga
 */
export default function ListarMedico() {
const [medico, setMedicos] = useState([]);
const [loading, setLoading] = useState(true);
const navigation = useNavigation();

const handleMedicos = async () => {
    setLoading(true);
    try {
        const result = await listarMedicos();
    if (result.success) {
        setMedicos(result.data);
    } else {
        Alert.alert(
            "Error",
            result.message || "No se pudieorn cargar los medicos"
        );
    }
    } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los medicos");
    } finally {
        setLoading(false);
    }
};
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", handleMedicos);
        return unsubscribe;
    }, [navigation]);

const handleEliminar = (id) => {
    Alert.alert(
        "Eliminar medico",
        "¿Estas seguro que deseas elimina el medico?",
        [
            { text: "cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
            onPress: async () => {
                try {
                    const result = await eliminarMedico(id);
                if (result.success) {
                    // setActividades(actividades.filter((a) => a.id !== id));
                    handleMedicos();
                } else {
                    Alert.alert(
                        "Error",
                        result.message || "no se pudo eliminar el medico"
                    );
                }
                } catch (error) {
                    Alert.alert("Error", "no se pudo elimianr el medico");
                }
            },
            },
        ]
    );
};

const handleEditar = (medico) => {
    navigation.navigate("EditarMedico", { medico });
};

const handleCrear = () => {
    navigation.navigate("EditarMedico");
};

if (loading) {
    <View>
    <ActivityIndicator size="large" color="#1976D2" />
    </View>;
}

return (
    <View style={{ flex: 1 }}>
    <FlatList
        data={medico}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <MedicoCard
            medico={item}
            onEdit={() => handleEditar(item)} //accion editar
            onDelete={() => handleEliminar(item.id)} //accion eliminar
        />
        )}
        ListEmptyComponent={<Text>No hay medicos Registrados.</Text>}
    />

    <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
        <Text style={styles.textBoton}>+ Nuevo Medico</Text>
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
