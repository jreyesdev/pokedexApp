import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';

import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import usePokemonSearch from '../hooks/usePokemonSearch';
import {SimplePokemon} from '../interfaces';
import {globalStyles} from '../theme/appTheme';

const screenWidth = Dimensions.get('screen').width;

const SearchScreen = () => {
  const {isFetching, pokemonList} = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }
    setPokemonFiltered(() => {
      if (isNaN(Number(term))) {
        return pokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase()),
        );
      } else {
        const pokeById = pokemonList.find(poke => poke.id === term);
        return pokeById ? [pokeById] : [];
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  if (isFetching) {
    return <Loading text="Cargando..." />;
  }

  return (
    <View style={globalStyles.container}>
      <SearchInput style={s.search} onDebounce={setTerm} />
      <FlatList
        data={pokemonFiltered}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={poke => poke.id}
        ListHeaderComponent={<Text style={s.title}>{term}</Text>}
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
