import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import {DetailPokemon, Sprites} from '../interfaces';
import {globalStyles} from '../theme/appTheme';
import FadeInImage from './FadeInImage';

interface Props {
  detail: DetailPokemon;
}

type IconsStats = {
  [key: string]: string;
  defense: string;
  'special-defense': string;
  speed: string;
  hp: string;
  attack: string;
  'special-attack': string;
};

const PokemonDetail = ({detail}: Props) => {
  const sprites: string[] = [];

  Object.keys(detail.sprites).map(sp => {
    if (sp.startsWith('b') || sp.startsWith('f')) {
      if (detail.sprites[sp as keyof Sprites] as string) {
        return sprites.unshift(detail.sprites[sp as keyof Sprites] as string);
      }
    }
  });

  const icons: IconsStats = {
    defense: 'shield-outline',
    'special-defense': 'shield-checkmark-outline',
    speed: 'flash-outline',
    hp: 'heart-outline',
    attack: 'eyedrop-outline',
    'special-attack': 'color-wand-outline',
  };

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <View style={s.contAndSeparator}>
        {/* Tipo */}
        <Text style={s.title}>Types</Text>
        <Text style={s.regularText}>
          {detail.types.map(({type}) => type.name).join(', ')}
        </Text>
        {/* Peso */}
        <Text style={s.title}>Weight</Text>
        <Text style={s.regularText}>{detail.weight} hg</Text>
      </View>

      {/* Imagenes */}
      <View style={globalStyles.containerFull}>
        <Text style={[s.title, globalStyles.marginH]}>Sprites</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sprites.map(sprite => (
            <FadeInImage key={sprite} uri={sprite} style={s.spriteImg} />
          ))}
        </ScrollView>
      </View>

      <View style={globalStyles.container}>
        {/* Habilidades */}
        <Text style={s.title}>Abilities</Text>
        <Text style={s.regularText}>
          {detail.abilities.map(a => a.ability.name).join(', ')}
        </Text>
        {/* Movimientos */}
        <Text style={s.title}>Moves</Text>
        <Text style={s.regularText}>
          {detail.moves.map(m => m.move.name).join(', ')}
        </Text>
        {/* Stadisticas */}
        <Text style={s.title}>Stats</Text>
        {detail.stats.map((st, i) => (
          <View key={st.stat.name + i} style={s.statsContainer}>
            <Icon name={icons[st.stat.name]} size={20} style={s.statIcon} />
            <Text style={s.regularText}>{st.stat.name}</Text>
            <Text style={globalStyles.containerFull}> </Text>
            <Text style={s.statBase}>{st.base_stat}</Text>
          </View>
        ))}
        {/* Footer */}
        <View style={s.imgFooter}>
          <FadeInImage uri={detail.sprites.front_default} style={s.spriteImg} />
        </View>
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  scroll: {
    ...StyleSheet.absoluteFillObject,
  },
  contAndSeparator: {
    ...globalStyles.container,
    paddingTop: 350,
  },
  title: {
    marginTop: 15,
    fontWeight: '700',
    fontSize: 25,
    color: 'black',
  },
  regularText: {
    fontSize: 18,
  },
  spriteImg: {
    height: 100,
    width: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  statIcon: {
    marginRight: 10,
  },
  statBase: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  imgFooter: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default PokemonDetail;
