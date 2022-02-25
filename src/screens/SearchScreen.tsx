import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';

import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import usePokemonSearch from '../hooks/usePokemonSearch';
import {globalStyles} from '../theme/appTheme';

const screenWidth = Dimensions.get('screen').width;

const SearchScreen = () => {
  const {isFetching, pokemonList} = usePokemonSearch();
  // const isFetching = false;

  if (isFetching) {
    return <Loading text="Cargando..." />;
  }

  return (
    <View style={globalStyles.container}>
      <SearchInput style={s.search} />
      <FlatList
        data={pokemonList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={poke => poke.id}
        ListHeaderComponent={<Text style={s.title}>Busqueda</Text>}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.4}
      />
    </View>
  );
};

const s = StyleSheet.create({
  search: {
    position: 'absolute',
    zIndex: 1,
    width: screenWidth - 40,
  },
  title: {
    ...globalStyles.title,
    marginTop: 55,
    marginBottom: 5,
  },
});

export default SearchScreen;
