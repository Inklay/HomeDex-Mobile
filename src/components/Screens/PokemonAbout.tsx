import React from 'react'
import { View, Text } from 'react-native'
import Pokemon from '../../classes/Pokemon'
import { abilities, eggGroups } from '../../data'
import { Style, TypeColors } from '../../style'
import { getName, Locale } from '../../utils'
import Spacer from '../Spacer'

interface Props {
  pokemon: Pokemon
  color: string
}

const PokemonAbout: React.FC<Props> = ({pokemon, color}) => {

  function getLatestFlavor() : string | undefined {
    const gameOrder = [
      'legends-arceus',
      'sword',
      'shield',
      'lets-go-eevee',
      'lets-go-pikachu',
      'omega-ruby',
      'alpha-sapphire',
      'y',
      'x',
      'black-2',
      'white-2',
      'black',
      'white',
      'heartgold',
      'soulvilver',
      'plaitnum',
      'diamond',
      'pearl',
      'emerald',
      'firered',
      'leafgreen',
      'ruby',
      'sapphire',
      'crystal',
      'silver',
      'gold',
      'yellow',
      'blue',
      'red'
    ]
    for (let i = 0; i < gameOrder.length; i++) {
      const text = pokemon.flavor_texts.find(t => t.game === gameOrder[i])
      if (text !== undefined)
        return getName(text.texts, Locale.locale).replace('\n', ' ')
    }
    return undefined
  }

  function formatHeight() : string {
    const meters = Math.floor(pokemon.height * 10) / 10
    const totalInches = Math.round(meters * 39.36)
    const foot = Math.floor(totalInches / 12)
    const inches = totalInches % 12
    return `${meters}m / ${foot}'${inches}"`
  }

  function formatWeight() : string {
    const kilos = Math.floor(pokemon.weight * 10) / 10
    const lbs = Math.floor(pokemon.weight * 2.205 * 10) / 10
    return `${kilos}kg / ${lbs}lbs`
  }

  function getAbility(idx: number, hidden: boolean = false) : string | undefined {
    if (hidden)
      return getName(abilities[pokemon.abilities.find(a => a.is_hidden === true)!.ability - 1], Locale.locale)
    let passed = false
    for (let i = 0; i < pokemon.abilities.length; i++) {
      if (pokemon.abilities[i].is_hidden)
        continue
      if (idx === 2) {
        if (passed)
          return getName(abilities[pokemon.abilities[i].ability - 1], Locale.locale)
        else {
          passed = true
          continue
        }
      }
      if (idx === 1)
        return getName(abilities[pokemon.abilities[i].ability - 1], Locale.locale)
    }
    return undefined
  }

  function formatGrowthRate() : string {
    switch (pokemon.growth_rate) {
      case 'slow':
        return Locale.pokemonScreen.about.data.growth_rate.slow
      case 'medium':
        return Locale.pokemonScreen.about.data.growth_rate.medium
      case 'fast':
        return Locale.pokemonScreen.about.data.growth_rate.fast
      case 'medium-slow':
        return Locale.pokemonScreen.about.data.growth_rate.medium_slow
      case 'fast-then-very-slow':
        return Locale.pokemonScreen.about.data.growth_rate.fast_then_very_slow
      case 'slow-then-very-fast':
      default:
        return Locale.pokemonScreen.about.data.growth_rate.slow_then_very_fast
    }
  }

  function getEggGroup(idx: number) : string {
    return getName(eggGroups[pokemon.egg_groups[idx] - 1], Locale.locale)
  }

  const female = 0.125 * pokemon.gender_rate * 100
  const male = 100 - female

  return (
    <View>
      <Text style={Style.pokemonFlavourtext}>{getLatestFlavor()}</Text>
      <Text style={[Style.pokemonScreenTitle, {color: color}]}>{Locale.pokemonScreen.about.data.data}</Text>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.data.category}</Text>
        <Text style={Style.pokemonScreenFieldData}>{getName(pokemon.categories, Locale.locale)}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.data.height}</Text>
        <Text style={Style.pokemonScreenFieldData}>{formatHeight()}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.data.weight}</Text>
        <Text style={Style.pokemonScreenFieldData}>{formatWeight()}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.data.catch_rate}</Text>
        <Text style={Style.pokemonScreenFieldData}>{pokemon.capture_rate}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.data.base_friendship}</Text>
        <Text style={Style.pokemonScreenFieldData}>{pokemon.base_friendship}</Text>
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.data.growth_rate.growth_rate}</Text>
        <Text style={Style.pokemonScreenFieldData}>{formatGrowthRate()}</Text>
      </View>
      <Text style={[Style.pokemonScreenTitle, {color: color}]}>{Locale.pokemonScreen.about.abilities.abilities}</Text>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.abilities.ability} 1</Text>
        <Text style={Style.pokemonScreenFieldData}>{getAbility(1)}</Text>
      </View>
      { pokemon.abilities.length === 3 ?
        <View style={Style.pokemonScreenFieldContainer}>
          <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.abilities.ability} 2</Text>
          <Text style={Style.pokemonScreenFieldData}>{getAbility(2)}</Text>
        </View> : <View></View>
      }
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.abilities.hidden}</Text>
        <Text style={Style.pokemonScreenFieldData}>{getAbility(0, true)}</Text>
      </View>
      <Text style={[Style.pokemonScreenTitle, {color: color}]}>{Locale.pokemonScreen.about.breeding.breeding}</Text>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.breeding.gender_ratio}</Text>
        { pokemon.gender_rate !== -1 ?
          <View style={{flexDirection: 'row'}}>
            <Text style={[Style.pokemonScreenFieldData, {color: TypeColors.flying}]}>♂${male}%</Text>
            <Text style={Style.pokemonScreenFieldData}> / </Text>
            <Text style={[Style.pokemonScreenFieldData, {color: TypeColors.fairy}]}>♀${female}%</Text> 
          </View> :
          <Text style={Style.pokemonScreenFieldData}>{Locale.pokemonScreen.about.breeding.genderless}</Text>
        }
      </View>
      <View style={Style.pokemonScreenFieldContainer}>
        <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.breeding.egg_group} 1</Text>
        <Text style={Style.pokemonScreenFieldData}>{getEggGroup(0)}</Text>
      </View>
      { pokemon.egg_groups.length === 2 ? 
        <View style={Style.pokemonScreenFieldContainer}>
          <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.about.breeding.egg_group} 2</Text>
          <Text style={Style.pokemonScreenFieldData}>{getEggGroup(1)}</Text>
        </View> : 
        <View></View>
      }
      <Spacer/>
    </View>
  )
}

export default PokemonAbout
