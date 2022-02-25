import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {PokemonPaginatedResponse, Result, SimplePokemon} from '../interfaces';

const usePokemonSearch = () => {
  const abort = new AbortController();

  const [isFetching, setIsFetching] = useState(true);
  const [pokemonList, setPokemonList] = useState<SimplePokemon[]>([]);

  // Carga lista de pokemones
  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon/?limit=1200',
      {signal: abort.signal},
    );
    // Formatea a SimplePokemon
    toSimplePokemon(resp.data.results);
  };

  // Cambia formato a pokemon simple
  const toSimplePokemon = (pokeList: Result[]) => {
    const list: SimplePokemon[] = pokeList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, name, picture};
    });

    setPokemonList(list);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();

    return () => {
      abort.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {isFetching, pokemonList};
};

export default usePokemonSearch;
