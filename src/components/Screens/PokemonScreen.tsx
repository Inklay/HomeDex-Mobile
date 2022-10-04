import React from 'react'
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native'
import Pokemon from '../../classes/Pokemon'
import { BackgroundColors, Style } from '../../style'
import { getName, getTypeBackgroundColor, fixId, Locale } from '../../utils'
import CachedImage from 'react-native-expo-cached-image'
import LeftArrow from '../svgs/LeftArrow'
import TypeName from '../TypeName'
import Dots from '../svgs/Dots'
import { abilities } from '../../data'

interface Props {
  navigation: any,
  route : {
    params: {
      pokemon: Pokemon
    }
  }
}

const PokemonScreen: React.FC<Props> = ({navigation, route}) => {

  enum Screens {
    NONE = 0,
    ABOUT = 1,
    STATS = 2
  }

  const pokemon = route.params.pokemon
  const color = getTypeBackgroundColor(pokemon.types[0])
  let screen = Screens.ABOUT

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

  return (
    <View style={[Style.container, {backgroundColor: color}]}>
      <View style={Style.pokemonPageTop}>
        <Text style={[Style.pokemonPageTopName, {color: color}]}>{getName(pokemon.names, Locale.locale).toLocaleUpperCase()}</Text>
        <TouchableWithoutFeedback onPress={() => {navigation.goBack()}}>
          <LeftArrow style={Style.backIcon} color={BackgroundColors.white} height={20} width={20}/>
        </TouchableWithoutFeedback>
        <View style={Style.pokemonPageHeader}>
          <CachedImage resizeMode='contain' style={Style.pokemonPageImage} source={{uri: pokemon.sprite}}/>
          <View>
            <Text style={Style.pokemonPageNumber}>#{fixId(pokemon)}</Text>
            <Text style={Style.pokemonPageName}>{getName(pokemon.names, Locale.locale)}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={Style.pokemonTypesName}>
                {pokemon.types.map((t, idx) => 
                  <TypeName type={t} key={`type-${idx}`}/>
                )}
              </View>
              <Dots style={[Style.cardDots, {left: 180, top: 20}]} color={BackgroundColors.white} height={32} width={74}/>
            </View>
          </View>
        </View>
        <View style={Style.pokemonScreenSelector}>
          <Text style={screen === Screens.ABOUT ? Style.pokemonScreenSelectorTextSelected : Style.pokemonScreenSelectorText}>{Locale.pokemonScreen.about}</Text>
          {/*<Text style={screen === Screens.STATS ? Style.pokemonScreenSelectorTextSelected : Style.pokemonScreenSelectorText}>{Locale.pokemonScreen.stats}</Text>*/}
        </View>
      </View>
      <View style={Style.pokemonScreenContent}>
        <ScrollView>
          <TouchableWithoutFeedback>
            <View>
              <Text style={Style.pokemonFlavourtext}>{getLatestFlavor()}</Text>
              <Text style={[Style.pokemonScreenTitle, {color: color}]}>{Locale.pokemonScreen.data.data}</Text>
              <View style={Style.pokemonScreenFieldContainer}>
                <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.data.category}</Text>
                <Text style={Style.pokemonScreenFieldData}>{getName(pokemon.categories, Locale.locale)}</Text>
              </View>
              <View style={Style.pokemonScreenFieldContainer}>
                <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.data.height}</Text>
                <Text style={Style.pokemonScreenFieldData}>{formatHeight()}</Text>
              </View>
              <View style={Style.pokemonScreenFieldContainer}>
                <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.data.weight}</Text>
                <Text style={Style.pokemonScreenFieldData}>{formatWeight()}</Text>
              </View>
              <View style={Style.pokemonScreenFieldContainer}>
                <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.data.catch_rate}</Text>
                <Text style={Style.pokemonScreenFieldData}>{pokemon.capture_rate}</Text>
              </View>
              <View style={Style.pokemonScreenFieldContainer}>
                <Text style={Style.pokemonScreenField}>{Locale.pokemonScreen.data.base_friendship}</Text>
                <Text style={Style.pokemonScreenFieldData}>{pokemon.base_friendship}</Text>
              </View>
              <Text style={[Style.pokemonScreenTitle, {color: color}]}>{Locale.pokemonScreen.abilities.abilities}</Text>
              <View style={Style.pokemonScreenFieldContainer}>
                <Text style={Style.pokemonScreenField}>{`${Locale.pokemonScreen.abilities.ability} 1`}</Text>
                <Text style={Style.pokemonScreenFieldData}>{getAbility(1)}</Text>
              </View>
              { pokemon.abilities.length === 3 ?
                <View style={Style.pokemonScreenFieldContainer}>
                  <Text style={Style.pokemonScreenField}>{`${Locale.pokemonScreen.abilities.ability} 2`}</Text>
                  <Text style={Style.pokemonScreenFieldData}>{getAbility(2)}</Text>
                </View> : <View></View>
              }
              <View style={Style.pokemonScreenFieldContainer}>
                <Text style={Style.pokemonScreenField}>{`${Locale.pokemonScreen.abilities.hidden}`}</Text>
                <Text style={Style.pokemonScreenFieldData}>{getAbility(0, true)}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </View>
  )
}

export default PokemonScreen
