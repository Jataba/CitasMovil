
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "../../../Screen/Inicio/Inicio";
import ConsultorioStack from "./ConsultorioStack";
import CitaStack from "./CitaStack"; 
import MedicoStack from "./MedicoStack";
import PacienteStack from "./PacienteStack";
import HorarioStack from "./HorarioStack";

const Stack = createStackNavigator();

export default function InicioStack () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name= "Inicio"
                component={Inicio}
            />
            <Stack.Screen
                name="Citas"
                component={CitaStack}
            />
            <Stack.Screen
                name="Consultorios"
                component={ConsultorioStack}
            />
            <Stack.Screen
                name="HorarioMedicos"
                component={HorarioStack}
            />
            <Stack.Screen
                name="Medicos"
                component={MedicoStack}
            />
            <Stack.Screen
                name="Pacientes"
                component={PacienteStack}
            />
        </Stack.Navigator>
    );
}