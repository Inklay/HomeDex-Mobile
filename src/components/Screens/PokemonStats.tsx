import React from 'react'
import { View, Text } from 'react-native'
import Pokemon from '../../classes/Pokemon'
import { BackgroundColors, Style } from '../../style'
import { getName, Locale } from '../../utils'
import Spacer from '../Spacer'
import StatBar from '../StatBar'
import TypeBadge from '../TypeBadge'
import TypeEffectiveness from '../TypeEffectiveness'

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

function getMaxStat(idx: number) : number {
  if (idx === 0) {
    if (pokemon.id === 292)
      return 1
    return Math.floor(0.01 * (2 * pokemon.stats[idx].base + 31 + Math.floor(0.25 * 252)) * 100) + 100 + 10
  } else
    return Math.floor((Math.floor(0.01 * (2 * pokemon.stats[idx].base + 31 + Math.floor(0.25 * 252)) * 100) + 5) * 1.10)
}

function getMinStat(idx: number) : number {
  if (idx === 0) {
    if (pokemon.id === 292)
      return 1
    return Math.floor(0.01 * (2 * pokemon.stats[idx].base) * 100) + 100 + 10
  } else
    return Math.floor((Math.floor(0.01 * (2 * pokemon.stats[idx].base) * 100) + 5) * 0.90)
}

function getTypeEffectiveness(type: number) {
  let eff = 1
  return eff
}

  return (
    <View>
      <Text style={[Style.pokemonScreenTitle, {color: color}]}>{Locale.pokemonScreen.stats.baseStats.baseStats}</Text>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.hp}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[0].base}</Text>
        <StatBar color={color} stat={pokemon.stats[0].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(0)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(0)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.attack}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[1].base}</Text>
        <StatBar color={color} stat={pokemon.stats[1].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(1)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(1)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.defense}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[2].base}</Text>
        <StatBar color={color} stat={pokemon.stats[2].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(2)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(2)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.spa}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[3].base}</Text>
        <StatBar color={color} stat={pokemon.stats[3].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(3)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(3)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.spd}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[4].base}</Text>
        <StatBar color={color} stat={pokemon.stats[4].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(4)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(4)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.speed}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{pokemon.stats[5].base}</Text>
        <StatBar color={color} stat={pokemon.stats[5].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(5)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(5)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{Locale.pokemonScreen.stats.baseStats.total}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getTotalStats()}</Text>
        <StatBar color={BackgroundColors.white} stat={255}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{Locale.pokemonScreen.stats.min}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{Locale.pokemonScreen.stats.max}</Text>
      </View>
      <Text style={Style.statInfoText}>{Locale.pokemonScreen.stats.infos}</Text>
      <Text style={[Style.pokemonScreenTitle, {color: color}]}>{Locale.pokemonScreen.stats.types.effectiveness}</Text>
      <Text style={Style.pokemonFlavourtext}>{Locale.pokemonScreen.stats.types.infos}{getName(pokemon.names, Locale.locale)}.</Text>
      <View style={Style.typeEffectiveness}>
        <TypeEffectiveness type={1} effectiveness={getTypeEffectiveness(1)}/>
        <TypeEffectiveness type={2} effectiveness={getTypeEffectiveness(2)}/>
        <TypeEffectiveness type={3} effectiveness={getTypeEffectiveness(3)}/>
        <TypeEffectiveness type={4} effectiveness={getTypeEffectiveness(4)}/>
        <TypeEffectiveness type={5} effectiveness={getTypeEffectiveness(5)}/>
        <TypeEffectiveness type={6} effectiveness={getTypeEffectiveness(6)}/>
        <TypeEffectiveness type={7} effectiveness={getTypeEffectiveness(7)}/>
        <TypeEffectiveness type={8} effectiveness={getTypeEffectiveness(8)}/>
        <TypeEffectiveness type={9} effectiveness={getTypeEffectiveness(9)}/>
      </View>
      <View style={Style.typeEffectiveness}>
        <TypeEffectiveness type={10} effectiveness={getTypeEffectiveness(10)}/>
        <TypeEffectiveness type={11} effectiveness={getTypeEffectiveness(11)}/>
        <TypeEffectiveness type={12} effectiveness={getTypeEffectiveness(12)}/>
        <TypeEffectiveness type={13} effectiveness={getTypeEffectiveness(13)}/>
        <TypeEffectiveness type={14} effectiveness={getTypeEffectiveness(14)}/>
        <TypeEffectiveness type={15} effectiveness={getTypeEffectiveness(15)}/>
        <TypeEffectiveness type={16} effectiveness={getTypeEffectiveness(16)}/>
        <TypeEffectiveness type={17} effectiveness={getTypeEffectiveness(17)}/>
        <TypeEffectiveness type={18} effectiveness={getTypeEffectiveness(18)}/>
      </View>
      <Spacer/>
    </View>
  )
}

export default PokemonStats
