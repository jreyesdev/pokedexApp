import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {PokemonPaginatedResponse, Result, SimplePokemon} from '../interfaces';

const usePokemonPaginated = () => {
  const abort = new AbortController();
  const urlPage = useRef('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40');

  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  // Carga lista de pokemones
  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      urlPage.current,
      {signal: abort.signal},
    );
    // Pagina siguiente
    urlPage.current = resp.data.next;
    // Formatea a SimplePokemon
    toSimplePokemon(resp.data.results);
  };

  // Cambia formato a pokemon simple
  const toSimplePokemon = (pokeList: Result[]) => {
    const pokemonList: SimplePokemon[] = pokeList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, name, picture};
    });

    setSimplePokemonList([...simplePokemonList, ...pokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();

    return () => {
      abort.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {isLoading, simplePokemonList, loadPokemons};
};

export default usePokemonPaginated;
