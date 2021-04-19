import React from 'react';
import {Button} from 'react-native';

export default function ButtonTest(props) {
  return (
    <Button
      title="test"
      onPress={() => {
        props.setData('2nd');
      }}
    />
  );
}
