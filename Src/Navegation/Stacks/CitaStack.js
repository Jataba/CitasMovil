import { createStackNavigator } from "@react-navigation/stack";
import DetalleCita from "../../../Screen/Citas/DetalleCita";
import EditarCita from "../../../Screen/Citas/EditarCita";
import ListarCita from "../../../Screen/Citas/ListarCita";

const Stack = createStackNavigator();

export default function CitaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarCita"
                component={ListarCita}
                options={{ title: "Citas" }}
            />
            <Stack.Screen
                name="DetalleCita"
                component={DetalleCita}
                options={{ title: "Detalles Cita" }}
            />
            <Stack.Screen
                name="EditarCita"
                component={EditarCita}
                options={{ title: "Nuevo/Editar Cita" }}
            />
        </Stack.Navigator>
    );
}