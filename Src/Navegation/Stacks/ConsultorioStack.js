import { createStackNavigator } from "@react-navigation/stack";
import ListarConsultorio from "../../../Screen/Consultorios/ListarConsultorio";
import DetalleConsultorio from "../../../Screen/Consultorios/DetalleConsultorio";
import EditarConsultorio from "../../../Screen/Consultorios/EditarConsultorio";


const Stack = createStackNavigator();

export default function CitaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarConsultorio"
                component={ListarConsultorio}
                options={{ title: "Consultorios" }}
            />
            <Stack.Screen
                name="DetalleConsultorio"
                component={DetalleConsultorio}
                options={{ title: "Detalles Consultorio" }}
            />
            <Stack.Screen
                name="EditarConsultorio"
                component={EditarConsultorio}
                options={{ title: "Nuevo/Editar Consultorio" }}
            />
        </Stack.Navigator>
    );
}