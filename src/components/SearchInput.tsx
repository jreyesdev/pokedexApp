import React, {useEffect, useState} from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useDebounceValue from '../hooks/useDebounceValue';

interface Props {
  style?: StyleProp<ViewStyle>;
  onDebounce: (value: string) => void;
}

const SearchInput = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');

  const debounced = useDebounceValue(textValue);

  useEffect(() => {
    onDebounce(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <View style={[s.container, style]}>
      <View style={s.textBackground}>
        <TextInput
          placeholder="Buscar pokemon"
          style={s.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          onChangeText={setTextValue}
          value={textValue}
        />
        <Icon name="search-outline" color="grey" size={20} />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  textBackground: {
    backgroundColor: '#f3f1f3',
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});

export default SearchInput;
