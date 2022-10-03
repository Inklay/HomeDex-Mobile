import React from 'react'
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native'
import Pokemon from '../../classes/Pokemon'
import { BackgroundColors, Style } from '../../style'
import { getName, getTypeBackgroundColor, fixId } from '../../utils'
import CachedImage from 'react-native-expo-cached-image'
import LeftArrow from '../svgs/LeftArrow'
import TypeName from '../TypeName'
import Dots from '../svgs/Dots'

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
        return getName(text.texts, 'fr').replace('\n', ' ')
    }
    return undefined
  }

  return (
    <View style={[Style.container, {backgroundColor: color}]}>
      <View style={Style.pokemonPageTop}>
        <Text style={[Style.pokemonPageTopName, {color: color}]}>{getName(pokemon.names, 'fr').toLocaleUpperCase()}</Text>
        <TouchableWithoutFeedback onPress={() => {navigation.goBack()}}>
          <LeftArrow style={Style.backIcon} color={BackgroundColors.white} height={20} width={20}/>
        </TouchableWithoutFeedback>
        <View style={Style.pokemonPageHeader}>
          <CachedImage resizeMode='contain' style={Style.pokemonPageImage} source={{uri: pokemon.sprite}}/>
          <View>
            <Text style={Style.pokemonPageNumber}>#{fixId(pokemon)}</Text>
            <Text style={Style.pokemonPageName}>{getName(pokemon.names, 'fr')}</Text>
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
          <Text style={screen === Screens.ABOUT ? Style.pokemonScreenSelectorTextSelected : Style.pokemonScreenSelectorText}>About</Text>
          {/*<Text style={screen === Screens.STATS ? Style.pokemonScreenSelectorTextSelected : Style.pokemonScreenSelectorText}>Stats</Text>*/}
        </View>
      </View>
      <View style={Style.pokemonScreenContent}>
        <ScrollView>
          <TouchableWithoutFeedback>
            <View>
              <Text style={Style.pokemonFlavourtext}>{getLatestFlavor()}</Text>
              <Text style={[Style.pokemonScreenTitle, {color: color}]}>Pokédex Data</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </View>
  )
}

export default PokemonScreen
