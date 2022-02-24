import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {RouteStackParams} from '../navigator/StackNavigator';
import FadeInImage from '../components/FadeInImage';
import usePokemon from '../hooks/usePokemon';
import {globalStyles} from '../theme/appTheme';
import PokemonDetail from '../components/PokemonDetail';

interface Props extends StackScreenProps<RouteStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({navigation, route}: Props) => {
  const {color, pokemon} = route.params;
  const {isLoading, detail} = usePokemon(pokemon.id);
  return (
    <View style={globalStyles.containerFull}>
      <View style={{...s.header, backgroundColor: color}}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={s.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>
        <Text style={s.title}>{pokemon.name + '\n#' + pokemon.id}</Text>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={s.imgPokebola}
        />
        <FadeInImage uri={pokemon.picture} style={s.imgPokemon} />
      </View>
      {isLoading ? (
        <View style={s.loading}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetail detail={detail} />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    zIndex: 999,
    height: 370,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,

    elevation: 10,
  },
  backButton: {
    color: 'white',
    position: 'absolute',
    left: 20,
    top: 10,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: '700',
    alignSelf: 'flex-start',
    left: 20,
    top: 40,
  },
  imgPokebola: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  imgPokemon: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -10,
  },
});
export default PokemonScreen;
