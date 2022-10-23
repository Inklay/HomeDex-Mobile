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
  const t1 = pokemon.types[0]
  const t2 = pokemon.types.length === 2 ? pokemon.types[1] : -1

  // Normal
  if (t1 === 1 || t2 === 1) {
    if (type === 2)
      eff *= 0.5
    else if (type === 8)
      return 0
  }

  // Fighting
  if (t1 === 2 || t2 === 2) {
    if (type === 3 || type === 14 || type === 18)
      eff *= 2
    else if (type === 6 || type === 7 || type === 17)
      eff *= 0.5
  }

  // Flying
  if (t1 === 3 || t2 === 3) {
    if (type === 6 || type === 13 || type === 15)
      eff *= 2
    else if (type === 2 || type === 7 || type === 12)
      eff *= 0.5
    else if (type === 5)
      return 0
  }

  // Poison
  if (t1 === 4 || t2 === 4) {
    if (type === 5 || type === 14)
      eff *= 2
    else if (type === 2 || type === 4 || type === 7 || type === 12 || type === 18)
      eff *= 0.5
  }

  // Ground
  if (t1 === 5 || t2 === 5) {
    if (type === 11 || type === 12 || type === 15)
      eff *= 2
    else if (type === 4 || type === 6)
      eff *= 0.5
    if (type === 13)
      return 0
  }

  // Rock
  if (t1 === 6 || t2 === 6) {
    if (type === 2 || type === 5 || type === 9 || type === 11 || type === 12)
      eff *= 2
    else if (type === 1 || type === 3 || type === 4 || type === 10)
      eff *= 0.5
  }

  // Bug
  if (t1 === 7 || t2 === 7) {
    if (type === 3 || type === 6 || type === 10)
      eff *= 2
    else if (type === 2 || type === 6 || type === 12)
      eff *= 0.5
  }

  // Ghost
  if (t1 === 8 || t2 === 8) {
    if (type === 8 || type === 17)
      eff *= 2
    else if (type === 4 || type === 7)
      eff *= 0.5
    else if (type === 1 || type === 2)
      return 0
  }

  // Steel
  if (t1 === 9 || t2 === 9) {
    if (type === 3 || type === 5 || type === 10)
      eff *= 2
    else if (type === 1 || type === 3 || type === 6 || type === 7 || type === 9 || type === 12 || type === 14 || type === 15 || type === 16 || type === 18)
      eff *= 0.5
    else if (type === 4)
      return 0
  }

  // Fire
  if (t1 === 10 || t2 === 10) {
    if (type === 5 || type === 6 || type === 11)
      eff *= 2
    else if (type === 7 || type === 9 || type === 10 || type === 12 || type === 15 || type === 18)
      eff *= 0.5
  }

  // Water
  if (t1 === 11 || t2 === 11) {
    if (type === 12 || type === 13)
      eff *= 2
    else if (type === 9 || type === 10 || type === 11 || type === 15)
      eff *= 0.5
  }

  // Grass
  if (t1 === 12 || t2 === 12) {
    if (type === 3 || type === 4 || type === 7 || type === 10 || type === 15)
      eff *= 2
    else if (type === 5 || type === 11 || type === 12 || type === 13)
      eff *= 0.5
  }

  // Eletric
  if (t1 === 13 || t2 === 13) {
    if (type === 5)
      eff *= 2
    else if (type === 3 || type === 9 || type === 13)
      eff *= 0.5
  }

  // Psychic
  if (t1 === 14 || t2 === 14) {
    if (type === 7 || type === 8 || type === 17)
      eff *= 2
    else if (type === 2 || type === 14)
      eff *= 0.5
  }

  // Ice
  if (t1 === 15 || t2 === 15) {
    if (type === 2 || type === 6 || type === 9 || type === 10)
      eff *= 2
    else if (type === 15)
      eff *= 0.5
  }

  // Dragon
  if (t1 === 16 || t2 === 16) {
    if (type === 15 || type === 16 || type === 18)
      eff *= 2
    else if (type === 10 || type === 11 || type === 12 || type === 13)
      eff *= 0.5
  }

  // Dark
  if (t1 === 17 || t2 === 17) {
    if (type === 2 || type === 7 || type === 18)
      eff *= 2
    else if (type === 8 || type === 14)
      eff *= 0.5
    else if (type === 14)
      return 0
  }

  // Fairy
  if (t1 === 18 || t2 === 18) {
    if (type === 4 || type === 9)
      eff *= 2
    else if (type === 2 || type === 7 || type === 17)
      eff *= 0.5
    else if (type === 16)
      return 0
  }

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
