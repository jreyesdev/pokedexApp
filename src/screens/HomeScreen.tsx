import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import FadeInImage from '../components/FadeInImage';
import usePokemonPaginated from '../hooks/usePokemonPaginated';
import {globalStyles} from '../theme/appTheme';

const HomeScreen = () => {
  const {loadPokemons, simplePokemonList} = usePokemonPaginated();

  return (
    <View style={globalStyles.container}>
      <Image
        source={require('../assets/pokebola.png')}
        style={globalStyles.imgPokebola}
      />
      <FlatList
        data={simplePokemonList}
        showsVerticalScrollIndicator={false}
        keyExtractor={poke => poke.id}
        renderItem={({item}) => (
          <FadeInImage uri={item.picture} style={s.img} />
        )}
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          <ActivityIndicator style={s.load} size={30} color="grey" />
        }
      />
    </View>
  );
};

const s = StyleSheet.create({
  title: {
    ...globalStyles.title,
    marginVertical: 20,
  },
  load: {
    height: 100,
  },
  img: {
    height: 100,
    width: 100,
  },
});

export default HomeScreen;
