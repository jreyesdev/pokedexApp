import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ImageColors from 'react-native-image-colors';

import {SimplePokemon} from '../interfaces';

import {RouteStackParams} from '../navigator/StackNavigator';
import FadeInImage from './FadeInImage';

interface Props {
  pokemon: SimplePokemon;
}

type HomeScreenNavigation = StackNavigationProp<RouteStackParams, 'HomeScreen'>;

const windowWidth = Dimensions.get('window').width;

const PokemonCard = ({pokemon}: Props) => {
  const navigation = useNavigation<HomeScreenNavigation>();
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();

    ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
      cache: true,
    })
      .then(colors => {
        if (isMounted.current) {
          switch (colors.platform) {
            case 'android':
              setBgColor(colors.dominant || 'grey');
              break;
            case 'ios':
              setBgColor(colors.background || 'grey');
              break;
            default:
              setBgColor('grey');
              break;
          }
        }
      })
      .catch(() => setBgColor('#eee'));

    return () => {
      isMounted.current = false;
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={pokemon.id}
      onPress={() =>
        navigation.navigate('PokemonScreen', {color: bgColor, pokemon})
      }>
      <View style={{...s.card, backgroundColor: bgColor}}>
        <View style={s.cardContainer}>
          <Text style={s.name}>{pokemon.name + '\n#' + pokemon.id}</Text>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={s.imgPokebola}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={s.imgPokemon} />
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  card: {
    height: 120,
    width: windowWidth * 0.4,
    marginHorizontal: 10,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardContainer: {
    flex: 1,
    padding: 10,
    overflow: 'hidden',
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
    color: 'white',
  },
  imgPokebola: {
    height: 100,
    width: 100,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.3,
  },
  imgPokemon: {
    height: 120,
    width: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
});

export default memo(PokemonCard);
