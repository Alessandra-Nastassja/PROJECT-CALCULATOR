import React from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';

const Button = ({ label, double, triple, operation, onPress }) => {
    const stylesButton = [styles.button];

    double && stylesButton.push(styles.buttonDouble)
    triple && stylesButton.push(styles.buttonTriple)
    operation && stylesButton.push(styles.operationButton)

    return (
        <TouchableOpacity onPress={() => onPress(label)}>
            <Text style={stylesButton}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 35,
        // Divide a tela em 4 partes
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        color: '#555',
        borderRadius: 25,
        marginTop: 5
    },
    operationButton: {
        color: '#fff',
        backgroundColor: '#01bb92'
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,
    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3,
    }
})

export default Button;