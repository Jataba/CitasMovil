import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';


export default function CitaCard({ cita, medicos, consultorios, pacientes = [],
    onEdit, onDelete, onChangeMedico, onChangePaciente, onChangeConsultorio, editable = false }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{cita.nombreMedico ? cita.nombreMedico : 'Sin nombre de médico'}</Text>
                <Text style={styles.detalle}>Paciente: {cita.nombrePaciente ? cita.nombrePaciente : 'Sin nombre de paciente'}</Text>
                <Text style={styles.detalle}>Consultorio: {cita.nombreConsultorio ? cita.nombreConsultorio : 'Sin nombre de consultorio'}</Text>
                <Text style={styles.detalle}>Hora: {cita.hora}</Text>
                <Text style={styles.detalle}>Fecha: {cita.fecha}</Text>
                <Text style={styles.detalle}>Motivo: {cita.motivo}</Text>

                {editable ? (
                    <Picker
                        selectedValue={cita.idMedico}
                        onValueChange={(value) => onChangeMedico && onChangeMedico(value)}
                        enabled={editable}
                        style={styles.picker
                        }>
                        {medicos.map((medico) => (
                            <Picker.Item
                                key={medico.id}
                                label={`${medico.nombre} (${medico.especialidad})`}
                                value={medico.id}
                            />
                        ))} 
                    </Picker>
                ) : (
                    <Text></Text>
                ) }

                {editable ? (
                    <Picker
                        selectedValue={cita.idPaciente}
                        onValueChange={(value) => onChangePaciente && onChangePaciente(value)}
                        enabled={editable}
                        style={styles.picker}>
                        {pacientes.map((paciente) => (
                            <Picker.Item
                                key={paciente.id}
                                label={`${paciente.nombre} (${paciente.documento})`}
                                value={paciente.id}
                            />
                        ))}
                    </Picker>
                ) : (
                    <Text></Text>
                )}

                {editable ? (
                    <Picker
                        selectedValue={cita.idConsultorio}
                        onValueChange={(value) => onChangeConsultorio && onChangeConsultorio(value)}
                        enabled={editable}
                        style={styles.picker}>
                        {consultorios.map((consultorio) => (
                            <Picker.Item
                                key={consultorio.id}
                                label={`${consultorio.nombre} (${consultorio.ubicacion})`}
                                value={consultorio.id}
                            />
                        ))}
                    </Picker>
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
