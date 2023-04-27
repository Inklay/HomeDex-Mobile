import React from 'react'
import { View, Text } from 'react-native'
import DataLocale from '../../classes/DataLocale'
import Pokemon from '../../classes/Pokemon'
import UILocale from '../../classes/UILocale'
import { BackgroundColors, Style } from '../../style'
import { getName } from '../../utils'
import Spacer from '../Spacer'
import StatBar from '../StatBar'
import TypeEffectiveness from '../TypeEffectiveness'

interface Props {
  pokemon: Pokemon
  color: string
  UILocale: UILocale
  dataLocale: DataLocale
}

export enum Types {
  NORMAL = 1,
  FIGHTING = 2,
  FLYING = 3,
  POISON = 4,
  GROUND = 5,
  ROCK = 6,
  BUG = 7,
  GHOST = 8,
  STEEL = 9,
  FIRE = 10,
  WATER = 11,
  GRASS = 12,
  ELECTRIC = 13,
  PSYCHIC = 14,
  ICE = 15,
  DRAGON = 16,
  DARK = 17,
  FAIRY = 18
}

const PokemonStats: React.FC<Props> = ({pokemon, color, UILocale, dataLocale}) => {

function getTotalStats() : string {
  let total = 0

  for (let i = 0; i < 6; i++)
    total += pokemon.stats[i].base
  if (total < 0) {
    return '???'
  }
  return `${total}`
}

function getMaxStat(idx: number) : string {
  if (pokemon.stats[idx].base === -1) {
    return '???'
  }
  if (idx === 0) {
    if (pokemon.dex_numbers.nat === 292)
      return '1'
    return `${Math.floor(0.01 * (2 * pokemon.stats[idx].base + 31 + Math.floor(0.25 * 252)) * 100) + 100 + 10}`
  } else
    return `${Math.floor((Math.floor(0.01 * (2 * pokemon.stats[idx].base + 31 + Math.floor(0.25 * 252)) * 100) + 5) * 1.10)}`
}

function getMinStat(idx: number) : string {
  if (pokemon.stats[idx].base === -1) {
    return '???'
  }
  if (idx === 0) {
    if (pokemon.dex_numbers.nat === 292)
      return '1'
    return `${Math.floor(0.01 * (2 * pokemon.stats[idx].base) * 100) + 100 + 10}`
  } else
    return `${Math.floor((Math.floor(0.01 * (2 * pokemon.stats[idx].base) * 100) + 5) * 0.90)}`
}

function formatStat(idx: number) : string {
  if (pokemon.stats[idx].base === -1) {
    return '???'
  }
  return `${pokemon.stats[idx].base}`
}

function getTypeEffectiveness(type: number) {
  let eff = 1
  const t1 = pokemon.types[0]
  const t2 = pokemon.types.length === 2 ? pokemon.types[1] : -1

  if (t1 === Types.NORMAL || t2 === Types.NORMAL) {
    if (type === Types.FIGHTING)
      eff *= 2
    else if (type === Types.GHOST)
      return 0
  }

  if (t1 === Types.FIGHTING || t2 === Types.FIGHTING) {
    if (type === Types.FLYING || type === Types.PSYCHIC || type === Types.FAIRY)
      eff *= 2
    else if (type === Types.ROCK || type === Types.BUG || type === Types.DARK)
      eff *= 0.5
  }

  if (t1 === Types.FLYING || t2 === Types.FLYING) {
    if (type === Types.ROCK || type === Types.ELECTRIC || type === Types.ICE)
      eff *= 2
    else if (type === Types.FIGHTING || type === Types.BUG || type === Types.GRASS)
      eff *= 0.5
    else if (type === Types.GROUND)
      return 0
  }

  if (t1 === Types.POISON || t2 === Types.POISON) {
    if (type === Types.GROUND || type === Types.PSYCHIC)
      eff *= 2
    else if (type === Types.FIGHTING || type === Types.POISON || type === Types.BUG || type === Types.GRASS || type === Types.FAIRY)
      eff *= 0.5
  }

  if (t1 === Types.GROUND || t2 === Types.GROUND) {
    if (type === Types.WATER || type === Types.GRASS || type === Types.ICE)
      eff *= 2
    else if (type === Types.POISON || type === Types.ROCK)
      eff *= 0.5
    if (type === Types.ELECTRIC)
      return 0
  }

  if (t1 === Types.ROCK || t2 === Types.ROCK) {
    if (type === Types.FIGHTING || type === Types.GROUND || type === Types.STEEL || type === Types.WATER || type === Types.GRASS)
      eff *= 2
    else if (type === Types.NORMAL || type === Types.FLYING || type === Types.POISON || type === Types.FIRE)
      eff *= 0.5
  }

  if (t1 === Types.BUG || t2 === Types.BUG) {
    if (type === Types.FLYING || type === Types.ROCK || type === Types.FIRE)
      eff *= 2
    else if (type === Types.FIGHTING || type === Types.ROCK || type === Types.GRASS)
      eff *= 0.5
  }

  if (t1 === Types.GHOST || t2 === Types.GHOST) {
    if (type === Types.GHOST || type === Types.DARK)
      eff *= 2
    else if (type === Types.POISON || type === Types.BUG)
      eff *= 0.5
    else if (type === Types.NORMAL || type === Types.FIGHTING)
      return 0
  }

  if (t1 === Types.STEEL || t2 === Types.STEEL) {
    if (type === Types.FLYING || type === Types.GROUND || type === Types.FIRE)
      eff *= 2
    else if (type === Types.NORMAL || type === Types.FLYING || type === Types.ROCK || type === Types.BUG || type === Types.STEEL || type === Types.GRASS || type === Types.PSYCHIC || type === Types.ICE || type === Types.DRAGON || type === Types.FAIRY)
      eff *= 0.5
    else if (type === Types.POISON)
      return 0
  }

  if (t1 === Types.FIRE || t2 === Types.FIRE) {
    if (type === Types.GROUND || type === Types.ROCK || type === Types.WATER)
      eff *= 2
    else if (type === Types.BUG || type === Types.STEEL || type === Types.FIRE || type === Types.GRASS || type === Types.ICE || type === Types.FAIRY)
      eff *= 0.5
  }

  if (t1 === Types.WATER || t2 === Types.WATER) {
    if (type === Types.GRASS || type === Types.ELECTRIC)
      eff *= 2
    else if (type === Types.STEEL || type === Types.FIRE || type === Types.WATER || type === Types.ICE)
      eff *= 0.5
  }

  if (t1 === Types.GRASS || t2 === Types.GRASS) {
    if (type === Types.FLYING || type === Types.POISON || type === Types.BUG || type === Types.FIRE || type === Types.ICE)
      eff *= 2
    else if (type === Types.GROUND || type === Types.WATER || type === Types.GRASS || type === Types.ELECTRIC)
      eff *= 0.5
  }

  if (t1 === Types.ELECTRIC || t2 === Types.ELECTRIC) {
    if (type === Types.GROUND)
      eff *= 2
    else if (type === Types.FLYING || type === Types.STEEL || type === Types.ELECTRIC)
      eff *= 0.5
  }

  if (t1 === Types.PSYCHIC || t2 === Types.PSYCHIC) {
    if (type === Types.BUG || type === Types.GHOST || type === Types.DARK)
      eff *= 2
    else if (type === Types.FIGHTING || type === Types.PSYCHIC)
      eff *= 0.5
  }

  if (t1 === Types.ICE || t2 === Types.ICE) {
    if (type === Types.FIGHTING || type === Types.ROCK || type === Types.STEEL || type === Types.FIRE)
      eff *= 2
    else if (type === Types.ICE)
      eff *= 0.5
  }

  if (t1 === Types.DRAGON || t2 === Types.DRAGON) {
    if (type === Types.ICE || type === Types.DRAGON || type === Types.FAIRY)
      eff *= 2
    else if (type === Types.FIRE || type === Types.WATER || type === Types.GRASS || type === Types.ELECTRIC)
      eff *= 0.5
  }

  if (t1 === Types.DARK || t2 === Types.DARK) {
    if (type === Types.FIGHTING || type === Types.BUG || type === Types.FAIRY)
      eff *= 2
    else if (type === Types.GHOST || type === Types.PSYCHIC)
      eff *= 0.5
    else if (type === Types.PSYCHIC)
      return 0
  }

  if (t1 === Types.FAIRY || t2 === Types.FAIRY) {
    if (type === Types.POISON || type === Types.STEEL)
      eff *= 2
    else if (type === Types.FIGHTING || type === Types.BUG || type === Types.DARK)
      eff *= 0.5
    else if (type === Types.DRAGON)
      return 0
  }

  return eff
}

  return (
    <View>
      <Text style={[Style.pokemonScreenTitle, {color: color}]}>{UILocale.pokemonScreen.stats.baseStats.baseStats}</Text>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{UILocale.pokemonScreen.stats.baseStats.hp}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{formatStat(0)}</Text>
        <StatBar color={color} stat={pokemon.stats[0].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(0)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(0)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{UILocale.pokemonScreen.stats.baseStats.attack}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{formatStat(1)}</Text>
        <StatBar color={color} stat={pokemon.stats[1].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(1)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(1)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{UILocale.pokemonScreen.stats.baseStats.defense}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{formatStat(2)}</Text>
        <StatBar color={color} stat={pokemon.stats[2].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(2)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(2)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{UILocale.pokemonScreen.stats.baseStats.spa}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{formatStat(3)}</Text>
        <StatBar color={color} stat={pokemon.stats[3].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(3)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(3)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{UILocale.pokemonScreen.stats.baseStats.spd}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{formatStat(4)}</Text>
        <StatBar color={color} stat={pokemon.stats[4].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(4)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(4)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{UILocale.pokemonScreen.stats.baseStats.speed}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{formatStat(5)}</Text>
        <StatBar color={color} stat={pokemon.stats[5].base}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMinStat(5)}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getMaxStat(5)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenStatsField}>{UILocale.pokemonScreen.stats.baseStats.total}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{getTotalStats()}</Text>
        <StatBar color={BackgroundColors.white} stat={255}/>
        <Text style={Style.pokemonScreenStatsFieldData}>{UILocale.pokemonScreen.stats.min}</Text>
        <Text style={Style.pokemonScreenStatsFieldData}>{UILocale.pokemonScreen.stats.max}</Text>
      </View>
      <Text style={Style.statInfoText}>{UILocale.pokemonScreen.stats.infos}</Text>
      <Text style={[Style.pokemonScreenTitle, {color: color}]}>{UILocale.pokemonScreen.stats.types.effectiveness}</Text>
      <Text style={Style.pokemonFlavourtext}>{UILocale.pokemonScreen.stats.types.infos}{getName(pokemon.names, dataLocale.locale)}.</Text>
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
