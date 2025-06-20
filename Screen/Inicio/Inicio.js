import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 80) / 2; 

export default function Inicio() {
    const navigation = useNavigation();

    const handlePress = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.tituloPrincipal}>Bienvenido a Citas</Text>
                <Text style={styles.estado}>Estado: Habilitado</Text>
            </View>
            <View style={styles.cardsContainer}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePress("Citas")}
                    >
                        <Ionicons name="calendar-outline" size={40} color="#1976d2" />
                        <Text style={styles.cardText}>Citas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePress("Consultorios")}
                    >
                        <Ionicons name="business-outline" size={40} color="#1976d2" />
                        <Text style={styles.cardText}>Consultorios</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePress("HorarioMedicos")}
                    >
                        <Ionicons name="time-outline" size={40} color="#1976d2" />
                        <Text style={styles.cardText}>Horario Medicos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePress("Medicos")}
                    >
                        <Ionicons name="people-circle-outline" size={40} color="#1976d2" />
                        <Text style={styles.cardText}>Medicos</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.rowCenter}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePress("Pacientes")}
                    >
                        <Ionicons name="person-outline" size={40} color="#1976d2" />
                        <Text style={styles.cardText}>Pacientes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
        paddingTop: 50,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    tituloPrincipal: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1976d2',
        marginBottom: 5,
    },
    estado: {
        fontSize: 16,
        color: '#757575',
        textAlign: 'center',
    },
    cardsContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        padding: 10,
    },
    cardText: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        color: '#333',
        textAlign: 'center',
    },
});