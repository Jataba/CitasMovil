import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

/**
 * Componente que muestra/edita un horario médico con sus acciones.
 * Muestra el nombre del médico, día de la semana, hora de inicio y fin.
 * En modo editable (editable=true) muestra Pickers para seleccionar médico
 */
export default function HorarioCard({ horario, medicos = [], onEdit, onDelete, onChangeMedico, editable = false }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{horario.nombreMedico ? horario.nombreMedico : 'Sin nombre de médico'}</Text>
                <Text style={styles.detalle}>Día: {horario.dia_semana}</Text>
                <Text style={styles.detalle}>Hora inicio: {horario.hora_inicio}</Text>
                <Text style={styles.detalle}>Hora fin: {horario.hora_fin}</Text>

                {editable ? (
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={horario.idMedico}
                            onValueChange={(value) => onChangeMedico && onChangeMedico(value)}
                            enabled={editable}
                            style={styles.picker}
                        >
                            {medicos.map((medico) => (
                                <Picker.Item
                                    key={medico.id}
                                    label={`${medico.nombre} (${medico.especialidad})`}
                                    value={medico.id}
                                />
                            ))}
                        </Picker>
                    </View>
                ) : (
                    <Text></Text>
                )}
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        flex: 1,
    },
    nombre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    detalle: {
        fontSize: 14,
        color: '#555',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginTop: 5,
        backgroundColor: '#fff',
    },
    picker: {
        height: 40,
        width: '100%',
    },
    actions: {
        flexDirection: 'row',
    },
    iconBtn: {
        marginLeft: 10,
    },
});
