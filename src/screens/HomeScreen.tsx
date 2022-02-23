import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PokemonCard from '../components/PokemonCard';
import usePokemonPaginated from '../hooks/usePokemonPaginated';
import {globalStyles} from '../theme/appTheme';

const HeaderTitle = () => <Text style={s.title}>Pokedex</Text>;

const HomeScreen = () => {
  const {loadPokemons, simplePokemonList} = usePokemonPaginated();

  // const onEndReached = () => {
  //   if (!isLoading) {
  //     loadPokemons();
  //   }
  // };

  return (
    <View style={globalStyles.containerFull}>
      <Image
        source={require('../assets/pokebola.png')}
        style={globalStyles.imgPokebola}
      />
      <View style={s.contList}>
        <FlatList
          data={simplePokemonList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={poke => poke.id}
          ListHeaderComponent={<HeaderTitle />}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={s.load} size={30} color="grey" />
          }
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  contList: {
    alignItems: 'center',
  },
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
