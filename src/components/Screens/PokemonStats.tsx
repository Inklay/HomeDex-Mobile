import React from 'react'
import { View, Text } from 'react-native'
import Pokemon from '../../classes/Pokemon'
import { Style } from '../../style'
import { Locale } from '../../utils'
import Spacer from '../Spacer'
import StatBar from '../StatBar'

interface Props {
  pokemon: Pokemon
  color: string
}

const PokemonStats: React.FC<Props> = ({pokemon, color}) => {

function getTotalStats() : number {
  let total = 0

  for (let i = 0; i < 6; i++)
    total += pokemon.stats[i].base
  return total
}

  return (
    <View>
      <Text style={[Style.pokemonScreenTitle, {color: color}]}>{Locale.pokemonScreen.stats.baseStats.baseStats}</Text>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.hp}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[0].base}</Text>
        <StatBar color={color} stat={pokemon.stats[0].base}/>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.attack}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[1].base}</Text>
        <StatBar color={color} stat={pokemon.stats[1].base}/>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.defense}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[2].base}</Text>
        <StatBar color={color} stat={pokemon.stats[2].base}/>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.spa}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[3].base}</Text>
        <StatBar color={color} stat={pokemon.stats[3].base}/>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.spd}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[4].base}</Text>
        <StatBar color={color} stat={pokemon.stats[4].base}/>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.speed}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[5].base}</Text>
        <StatBar color={color} stat={pokemon.stats[5].base}/>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.total}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getTotalStats()}</Text>
      </View>
      <Spacer/>
    </View>
  )
}

export default PokemonStats
