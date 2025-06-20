
import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfil/Perfil";


const Stack = createStackNavigator();

export default function PerfilStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "Perfil"
                component={Perfil} 
                options={{ title: "Perfil" }}
            />
        </Stack.Navigator>
    );
}