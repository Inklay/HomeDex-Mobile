import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import Pokemon from '../../classes/Pokemon'
import { BackgroundColors, Style } from '../../style'
import { getName, getTypeBackgroundColor } from '../../utils'
import CachedImage from 'react-native-expo-cached-image'
import LeftArrow from '../svgs/LeftArrow'

interface Props {
  navigation: any,
  route : {
    params: {
      pokemon: Pokemon
    }
  }
}

const PokemonScreen: React.FC<Props> = ({navigation, route}) => {
  const pokemon = route.params.pokemon
  const color = getTypeBackgroundColor(pokemon.types[0])

  return (
    <View style={Style.container}>
      <View style={[Style.pokemonPageTop, {backgroundColor: color}]}>
        <Text style={[Style.pokemonPageTopName, {color: color}]}>{getName(pokemon.names, 'fr').toLocaleUpperCase()}</Text>
        <TouchableWithoutFeedback onPress={() => {
          navigation.goBack()
        }}>
          <LeftArrow style={Style.backIcon} color={BackgroundColors.white} height={20} width={20}/>
        </TouchableWithoutFeedback>
        <CachedImage resizeMode='contain' style={Style.pokemonPageImage} source={{uri: pokemon.sprite}}/>
      </View>
    </View>
  )
}

export default PokemonScreen