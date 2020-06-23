
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from './src/pages/Button';
import Display from './src/pages/Display';

export default function App() {
  const [displayValue, setDisplayValue] = useState(0);
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operate, setOperate] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  addDigit = n => {
    // Não deixa ter mais de um ponto no calculo
    if (n === '.' && displayValue.includes('.')) {
      return;
    }

    // Precisa substituir o zero pelo número clicado
    const cleaningDisplay = displayValue === '0' || clearDisplay;

    // Senão tiver valor irá usar aquele que foi clicado
    const currentValue = cleaningDisplay ? '' : displayValue;

    // Irá concatenar
    setDisplayValue(currentValue + n)

    // Você digitou um número
    if (n != '.') {
      const newValue = parseFloat(displayValue)

      const values = [...values]

      values[current] = newValue

      setValues(values)
    }

  }

  clearMemory = () => {
    setDisplayValue(0)
  }

  setOperation = operation => {

  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onPress={clearMemory} />
        <Button label="/" operation onPress={setOperation} />
        <Button label="7" onPress={addDigit} />
        <Button label="8" onPress={addDigit} />
        <Button label="9" onPress={addDigit} />
        <Button label="*" operation onPress={setOperation} />
        <Button label="4" onPress={addDigit} />
        <Button label="5" onPress={addDigit} />
        <Button label="6" onPress={addDigit} />
        <Button label="-" operation onPress={setOperation} />
        <Button label="1" onPress={addDigit} />
        <Button label="2" onPress={addDigit} />
        <Button label="3" onPress={addDigit} />
        <Button label="+" operation onPress={setOperation} />
        <Button label="0" double onPress={addDigit} />
        <Button label="." onPress={addDigit} />
        <Button label="=" operation onPress={setOperation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
