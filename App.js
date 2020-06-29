
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './src/pages/Button';
import Display from './src/pages/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operate, setOperate] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  addDigit = n => {
    // Não deixa ter mais de um ponto no calculo 
    if (n === '.' && displayValue.includes('.')) {
      return;
    }

    // Precisa substituir o zero pelo número clicado ou quando clicar em AC 
    const cleaningDisplay = displayValue === '0' || clearDisplay;

    // Senão tiver valor irá usar aquele que foi clicado
    const currentValue = cleaningDisplay ? '' : displayValue;

    // Irá concatenar os valores digitados
    const displayValues = currentValue + n
    setDisplayValue(displayValues)
    setClearDisplay(false)

    // Você digitou um número
    if (n !== '.') {
      const newValue = parseFloat(displayValue)

      const valuesCurrent = [...values]

      valuesCurrent[current] = newValue

      setValues(valuesCurrent)
    }
  }

  clearMemory = () => {
    setDisplayValue(initialState.displayValue);
    setClearDisplay(initialState.clearDisplay);
    setOperate(initialState.operation);
    setValues(initialState.values);
    setCurrent(initialState.current);
  }

  setOperation = operation => {
    // Irá setar o estado para que a operação seja recebida
    if (current === 0) {
      setOperate(operation)
      setCurrent(1)
      setClearDisplay(true)
    } else {
      const equals = operation === '='
      const currentValue = [...values]
      
      try {
        // Realiza o parse do número, além de fazer a operação
        currentValue[0] = eval(`${currentValue[0]} ${operate} ${currentValue[1]}`)
      } catch (e) {
        currentValue[0] = currentValue[0]
      }

      values[1] = 0
      setDisplayValue(currentValue[0]);
      setOperate(equals ? null : operation);
      setCurrent(equals ? 0 : 1)
      setClearDisplay(!equals)
      setValues(values)
    }
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
