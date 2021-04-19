/* eslint-disable react-native/no-inline-styles */
import 'react-native-get-random-values';
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {v4 as uuid} from 'uuid';

function item(id, price, count) {
  this.id = id;
  this.price = price;
  this.count = count;
  this.name = '';
  this.desc = '';
  this.photo = '';
  this.checked = true;
}

const hasMultiOperator = char => char.indexOf('*') > -1;

const getLastChar = str => str.charAt(str.length - 1);
const getLastEquationInit = str => str?.split('+')[str?.split('+').length - 2]; // 플러스가 하나 많다
const getLastEquationDone = str => str?.split('+')[str?.split('+').length - 1]; // 플러스가 하나 적다

const App = () => {
  const [input, setInput] = useState('');
  const [obj, setObj] = useState([]);
  const doneRef = useRef(false);

  const calculate = str => {
    if (input !== '' && !doneRef.current) {
      const lastEquationDone = getLastEquationDone(str);
      if (hasMultiOperator(lastEquationDone)) {
        console.log('lastEquationDone', lastEquationDone);
        const multiIndex = lastEquationDone.indexOf('*');
        const price = lastEquationDone.substring(0, multiIndex);
        const count = lastEquationDone.substring(multiIndex + 1, str.length);
        setObj(prev => {
          return prev.concat(new item(uuid(), Number(price), Number(count)));
        });
      } else {
        setObj(prev => {
          return prev.concat(
            new item(uuid(), Number(getLastEquationDone(str)), 1),
          );
        });
      }
    }
    doneRef.current = true;
  };
  const backspace = () => {};

  const reset = () => {
    setInput('');
    setObj([]);
    doneRef.current = false;
  };

  useEffect(() => {
    console.log(JSON.stringify(obj, null, 4));
  }, [input, obj]);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 50}}>{JSON.stringify(input, null, 4)}</Text>
      <TextInput
        style={styles.label}
        value={input}
        onChangeText={str => {
          if (!doneRef.current) {
            // = 계산을 완료 했다면, 반드시 리셋버튼을 클릭하기 위해
            setInput(str);
            if (getLastChar(str) === '+') {
              // + 로 끝나면
              const lastQuationInit = getLastEquationInit(str);
              if (hasMultiOperator(lastQuationInit)) {
                // * 곱셈이 있으면
                const multiIndex = lastQuationInit.indexOf('*');
                const price = lastQuationInit.substring(0, multiIndex);
                const count = lastQuationInit.substring(
                  multiIndex + 1,
                  lastQuationInit.length,
                );
                console.log('price', price, 'count', count);
                setObj(prev => {
                  return prev.concat(
                    new item(uuid(), Number(price), Number(count)),
                  );
                });
              } else {
                // * 곱셈이 없으면
                setObj(prev => {
                  return prev.concat(
                    new item(uuid(), Number(getLastEquationInit(str)), 1),
                  );
                });
              }
            }
          }
        }}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="numbers-and-punctuation"
      />
      <View
        style={{
          flex: 1,
          width: '85%',
          height: '100%',
          marginVertical: 50,
        }}>
        <Button
          color="#841584"
          title="="
          style={{height: 100, flex: 1}}
          onPress={() => calculate(input)}
        />

        <Button
          title="reset"
          style={{marginTop: 100, flex: 1}}
          onPress={reset}
        />

        <Button title="delete" color="tomato" onPress={backspace} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // fontSize: 30,
    color: '#000',
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 50,
    paddingVertical: 0,
    borderWidth: 1,
    width: '85%',
    height: 80,
    fontSize: 40,
    borderRadius: 15,
    shadowColor: '#000',
  },
});
export default App;
