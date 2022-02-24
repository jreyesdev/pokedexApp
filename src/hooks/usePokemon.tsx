import {useEffect, useState} from 'react';

import {pokemonApi} from '../api/pokemonApi';
import {DetailPokemon} from '../interfaces';

const usePokemon = (id: string) => {
  const abortController = new AbortController();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<DetailPokemon>({} as DetailPokemon);

  const loadPokemon = async () => {
    const resp = await pokemonApi.get<DetailPokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      {
        signal: abortController.signal,
      },
    );
    setPokemon(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {isLoading, detail: pokemon};
};

export default usePokemon;
