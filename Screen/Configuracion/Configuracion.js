import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottonComponent from '../../components/BottonComponent';
import { LogoutUser } from '../../Src/Servicios/AuthService';

/**
 * Pantalla de configuración de la aplicación con opciones de usuario.
 * 
 * Funcionalidades:
 * - Menú de configuración organizado en secciones
 * - Confirmación de cierre de sesión con alerta
 * - Acceso rápido a diferentes opciones de configuración
 * 
 * Componentes principales:
 * - Sección de Cuenta (ej: cambiar contraseña)
 * - Sección de Preferencias (ej: idioma)
 * - Sección de Ayuda (ej: soporte)
 * - Botón de cierre de sesión con confirmación
 */
export default function Configuracion() {
  const navigation = useNavigation();

  const handleOptionPress = (option) => {
    Alert.alert('Opción Seleccionada', `Has presionado: ${option}`);
  };

  const confirmarLogout = () => {
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
          style: 'destructive',
          onPress: async () => {
            const result = await LogoutUser();
            if (!result.success) {
              Alert.alert("Error", result.message || "No se pudo cerrar sesión.");
            }
            // appNavegacion se encarga de redirigir automáticamente
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
      <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress('Cambiar Contraseña')}>
        <Ionicons name="lock-closed-outline" size={24} color="#555" style={styles.optionIcon} />
        <Text style={styles.optionText}>Cambiar Contraseña</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#bbb" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Preferencias</Text>
      <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress('Idioma')}>
        <Ionicons name="language-outline" size={24} color="#555" style={styles.optionIcon} />
        <Text style={styles.optionText}>Idioma</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#bbb" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Ayuda y Soporte</Text>
      <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress('Contactar Soporte')}>
        <Ionicons name="mail-outline" size={24} color="#555" style={styles.optionIcon} />
        <Text style={styles.optionText}>Contactar Soporte</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#bbb" />
      </TouchableOpacity>

      <View style={styles.logoutButtonContainer}>
        <BottonComponent
          title="Cerrar Sesión"
          onPress={confirmarLogout}
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
        />
      </View>

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
  logoutButtonContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#e53935',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#e53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
