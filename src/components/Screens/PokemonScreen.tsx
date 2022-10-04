import React from 'react'
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native'
import Pokemon from '../../classes/Pokemon'
import { BackgroundColors, Style } from '../../style'
import { getName, getTypeBackgroundColor, fixId, Locale } from '../../utils'
import CachedImage from 'react-native-expo-cached-image'
import LeftArrow from '../svgs/LeftArrow'
import TypeName from '../TypeName'
import Dots from '../svgs/Dots'
import PokemonAbout from './PokemonAbout'
import PokemonStats from './PokemonStats'

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

  const [screen, setScreen] = React.useState(Screens.ABOUT)

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
          <TouchableWithoutFeedback onPress={() => setScreen(Screens.ABOUT)}>
            <Text style={screen === Screens.ABOUT ? Style.pokemonScreenSelectorTextSelected : Style.pokemonScreenSelectorText}>{Locale.pokemonScreen.about.about}</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setScreen(Screens.STATS)}>
            <Text style={screen === Screens.STATS ? Style.pokemonScreenSelectorTextSelected : Style.pokemonScreenSelectorText}>{Locale.pokemonScreen.stats.stats}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={Style.pokemonScreenContent}>
        <ScrollView>
          <TouchableWithoutFeedback>
            { screen === Screens.ABOUT ?
              <PokemonAbout pokemon={pokemon} color={color}/> :
              screen === Screens.STATS ?
              <PokemonStats pokemon={pokemon} color={color}/> :
              <View></View>
            }
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </View>
  )
}

export default PokemonScreen
