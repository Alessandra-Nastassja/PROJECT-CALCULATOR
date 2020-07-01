
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './src/pages/Button';
import Display from './src/pages/Display';

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [current, setCurrent] = useState(null);
  const [operation, setOperation] = useState(null);

  const clearMemory = () => {
    setDisplayValue('0');
    setCurrent(0)
    setOperation(null);
  }

  const showResult = n => {
    setDisplayValue(`${n}`);
    setCurrent(`${n}`);
    setOperation(null);
  }

  const addDigit = n => {
    // Não deixa ter mais de um ponto no calculo 
    if (n === '.' && displayValue.includes('.')) {
      return;
    }

    // Precisa substituir o zero pelo número clicado ou quando clicar em AC, senão tiver um valor irá usar aquele que foi clicado
    setDisplayValue(`${(displayValue + n).replace(/^0+/, '')}`);
  }

  const addOperation = operation => {
    // Irá setar o estado para que a operação seja recebida
    if (displayValue !== '0') {
      setOperation(operation);
      setCurrent(displayValue);
      setDisplayValue('');
    }
    if (current) {
      setOperation(operation)
    }

    doMath()
  }

  // Realiza o parse do número, além de fazer a operação
  const doMath = () => {
    if (displayValue && current && operation) {
      const resul = eval(`${(parseFloat(current))} ${operation} ${parseFloat(displayValue)}`);
      showResult(resul);
    }
  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onPress={clearMemory} />
        <Button label="/" operation onPress={addOperation} />
        <Button label="7" onPress={addDigit} />
        <Button label="8" onPress={addDigit} />
        <Button label="9" onPress={addDigit} />
        <Button label="*" operation onPress={addOperation} />
        <Button label="4" onPress={addDigit} />
        <Button label="5" onPress={addDigit} />
        <Button label="6" onPress={addDigit} />
        <Button label="-" operation onPress={addOperation} />
        <Button label="1" onPress={addDigit} />
        <Button label="2" onPress={addDigit} />
        <Button label="3" onPress={addDigit} />
        <Button label="+" operation onPress={addOperation} />
        <Button label="0" double onPress={addDigit} />
        <Button label="." onPress={addDigit} />
        <Button label="=" operation onPress={addOperation} />
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
    flexWrap: 'wrap',
    marginTop: 2,
    marginBottom: 6
  }
});