import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native'; 

export default function Configuracion() {
    const navigation = useNavigation();
    const [notificacionesActivadas, setNotificacionesActivadas] = React.useState(true); 

    const toggleNotificaciones = () => {
        setNotificacionesActivadas(previousState => !previousState);

    };

    const handleOptionPress = (option) => {
        Alert.alert('Opción Seleccionada', `Has presionado: ${option}`);

    };

    const handleLogout = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que quieres cerrar tu sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Cerrar Sesión',
                    onPress: () => {
                        console.log('Sesión cerrada');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>Configuración</Text>

            <Text style={styles.sectionTitle}>Cuenta</Text>
            <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress('Editar Perfil')}>
                <Ionicons name="person-outline" size={24} color="#555" style={styles.optionIcon} />
                <Text style={styles.optionText}>Editar Perfil</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#bbb" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress('Cambiar Contraseña')}>
                <Ionicons name="lock-closed-outline" size={24} color="#555" style={styles.optionIcon} />
                <Text style={styles.optionText}>Cambiar Contraseña</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#bbb" />
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Preferencias</Text>
            <View style={styles.optionItem}>
                <Ionicons name="notifications-outline" size={24} color="#555" style={styles.optionIcon} />
                <Text style={styles.optionText}>Notificaciones</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notificacionesActivadas ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotificaciones}
                    value={notificacionesActivadas}
                />
            </View>
            <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress('Idioma')}>
                <Ionicons name="language-outline" size={24} color="#555" style={styles.optionIcon} />
                <Text style={styles.optionText}>Idioma</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#bbb" />
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Ayuda y Soporte</Text>
            <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress('Preguntas Frecuentes')}>
                <Ionicons name="help-circle-outline" size={24} color="#555" style={styles.optionIcon} />
                <Text style={styles.optionText}>Preguntas Frecuentes</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#bbb" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress('Contactar Soporte')}>
                <Ionicons name="mail-outline" size={24} color="#555" style={styles.optionIcon} />
                <Text style={styles.optionText}>Contactar Soporte</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#bbb" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>

            <View style={{ height: 50 }} /> 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1976d2',
        marginBottom: 30,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343a40',
        marginTop: 25,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 5,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    optionIcon: {
        marginRight: 15,
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
        shadowColor: '#dc3545',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});