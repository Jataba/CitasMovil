import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {AntDesign} from "@expo/vector-icons";

import InicioStack from "./Stacks/InicioStack";
import PerfilStack from "./Stacks/PerfilStack";
import ConfiguracionStack from "./Stacks/ConfiguracionStack";


const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: "#1976d2",
            tabBarInactiveTintColor: "#757575",
            tabBarStyle: { backgroundColor: "#fff" },
        }}
        >
        <Tab.Screen
            name="Inicio"
            component={InicioStack}
            options={{
            tabBarIcon: () => (
                <AntDesign name="home" size={24} color="black" />
            ),
            }}
        />
        <Tab.Screen
            name="Perfil"
            component={PerfilStack}
            options={{
            tabBarIcon: () => (
                <AntDesign name="user" size={24} color="black" />
            ),
            }}
        />
        <Tab.Screen
            name="Configuracion"
            component={ConfiguracionStack}
            options={{
            tabBarIcon: () => (
                <AntDesign name="setting" size={24} color="black" />
            ),
            }}
        />
        </Tab.Navigator>
    );
}