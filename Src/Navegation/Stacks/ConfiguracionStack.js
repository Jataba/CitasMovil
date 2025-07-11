
import { createStackNavigator } from "@react-navigation/stack";
import Configuracion from "../../../Screen/Configuracion/Configuracion";


const Stack = createStackNavigator();

export default function ConfiguracionStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "Configuracion"
                component={Configuracion}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}