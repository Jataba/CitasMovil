import { createStackNavigator } from "@react-navigation/stack";
import ListarHorario from "../../../Screen/HorarioMedicos/ListarHorario";
import DetalleHorario from "../../../Screen/HorarioMedicos/DetalleHorario";
import EditarHorario from "../../../Screen/HorarioMedicos/EditarHorario";



const Stack = createStackNavigator();

export default function HorarioStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarHorario"
                component={ListarHorario}
                options={{ title: "Horarios" }}
            />
            <Stack.Screen
                name="DetalleHorario"
                component={DetalleHorario}
                options={{ title: "Detalles Horario" }}
            />
            <Stack.Screen
                name="EditarHorario"
                component={EditarHorario}
                options={{ title: "Nuevo/Editar Horario" }}
            />
        </Stack.Navigator>
    );
}