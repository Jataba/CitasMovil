import { useEffect, useState } from "react";
import {View,Text,FlatList,StyleSheet,Alert,ActivityIndicator,TouchableOpacity,} from "react-native";
import ConsultorioCard from "../../components/ConsultorioCard";
import { useNavigation } from "@react-navigation/native";
import {listarConsultorios,eliminarConsultorio,} from "../../Src/Servicios/ConsultorioService";


/**
 * Pantalla para listar y gestionar consultorios médicos.
 * 
 * Funcionalidades:
 * - Carga y muestra lista de consultorios
 * - Permite crear, editar y eliminar consultorios
 * - Manejo de estados de carga
 */
export default function ListarConsultorio() {
const [consultorio, setConsultorios] = useState([]);
const [loading, setLoading] = useState(true);
const navigation = useNavigation();

const handleConsultorios = async () => {
    setLoading(true);
    try {
        const result = await listarConsultorios();
    if (result.success) {
        setConsultorios(result.data);
    } else {
        Alert.alert(
            "Error",
            result.message || "no se pudieorn cargar los consultorios"
        );
    }
    } catch (error) {
        Alert.alert("Error", "no se pudieron cargar los consultorios");
    } finally {
        setLoading(false);
    }
};
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", handleConsultorios);
        return unsubscribe;
    }, [navigation]);

const handleEliminar = (id) => {
    Alert.alert(
        "Eliminar consultorio",
        "¿Estas seguro que deseas elimina el consultorio?",
        [
            { text: "cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
            onPress: async () => {
                try {
                    const result = await eliminarConsultorio(id);
                if (result.success) {
                    // setActividades(actividades.filter((a) => a.id !== id));
                    handleConsultorios();
                } else {
                    Alert.alert(
                        "Error",
                        result.message || "no se pudo eliminar el consultorio"
                    );
                }
                } catch (error) {
                    Alert.alert("Error", "no se pudo elimianr el consultorio");
                }
            },
            },
        ]
    );
};

const handleEditar = (consultorio) => {
    navigation.navigate("EditarConsultorio", { consultorio });
};

const handleCrear = () => {
    navigation.navigate("EditarConsultorio");
};

if (loading) {
    <View>
    <ActivityIndicator size="large" color="#1976D2" />
    </View>;
}

return (
    <View style={{ flex: 1 }}>
    <FlatList
        data={consultorio}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <ConsultorioCard
            consultorio={item} //pasa la acTividad a la tarjeta
            onEdit={() => handleEditar(item)} //accion editar
            onDelete={() => handleEliminar(item.id)} //accion eliminar
        />
        )}
        ListEmptyComponent={<Text>No hay consultorios Registrados.</Text>}
    />

    <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
        <Text style={styles.textBoton}>+ Nuevo Consultorio</Text>
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
