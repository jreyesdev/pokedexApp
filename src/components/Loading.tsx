import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

interface Props {
  color?: string;
  size?: number;
  text?: string;
}

const Loading = ({color, size, text}: Props) => {
  return (
    <View style={s.containerLoading}>
      <ActivityIndicator color={color || '#5658D6'} size={size || 60} />
      {text && <Text style={s.textLoading}>{text}</Text>}
    </View>
  );
};

const s = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
  },
});

export default Loading;
