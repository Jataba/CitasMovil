import { createStackNavigator } from "@react-navigation/stack";
import ListarMedico from "../../../Screen/Medicos/ListarMedico";
import DetalleMedico from "../../../Screen/Medicos/DetalleMedico";
import EditarMedico from "../../../Screen/Medicos/EditarMedicos";



const Stack = createStackNavigator();

export default function MedicoStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarMedico"
                component={ListarMedico}
                options={{ title: "Médicos" }}
            />
            <Stack.Screen
                name="DetalleMedico"
                component={DetalleMedico}
                options={{ title: "Detalles Médico" }}
            />
            <Stack.Screen
                name="EditarMedico"
                component={EditarMedico}
                options={{ title: "Nuevo/Editar Médico" }}
            />
        </Stack.Navigator>
    );
}