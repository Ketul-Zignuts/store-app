import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ConfirmationModalProps = {
    visible: boolean;
    modalData: {
        title: string;
        description: string;
        confirmText: string;
        cancelText: string;
        resolve: (value: boolean) => void;
    };
    hideModal: () => void;
};

const ModalConfirmation: React.FC<ConfirmationModalProps> = ({ visible, modalData, hideModal }) => {
    const handleConfirm = () => {
        modalData.resolve(true);
        hideModal();
    };

    const handleCancel = () => {
        modalData.resolve(false);
        hideModal();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{modalData.title}</Text>
                    <Text style={styles.description}>{modalData.description}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.cancelText}>{modalData.cancelText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.confirmText}>{modalData.confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10,
    },
    confirmButton: {
        flex: 1,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelText: {
        color: '#333',
        fontWeight: 'bold',
    },
    confirmText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ModalConfirmation;
