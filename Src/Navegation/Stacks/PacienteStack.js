import { createStackNavigator } from "@react-navigation/stack";
import ListarPaciente from "../../../Screen/Pacientes/ListarPaciente";
import DetallePaciente from "../../../Screen/Pacientes/DetallePaciente";
import EditarPaciente from "../../../Screen/Pacientes/EditarPaciente";


const Stack = createStackNavigator();

export default function PacienteStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarPaciente"
                component={ListarPaciente}
                options={{ title: "Pacientes" }}
            />
            <Stack.Screen
                name="DetallePaciente"
                component={DetallePaciente}
                options={{ title: "Detalles Paciente" }}
            />
            <Stack.Screen
                name="EditarPaciente"
                component={EditarPaciente}
                options={{ title: "Nuevo/Editar Paciente" }}
            />
        </Stack.Navigator>
    );
}