import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import Pokemon from '../classes/Pokemon'
import { BackgroundColors, Style } from '../style'
import { getName, getTypeBackgroundColor, fixId } from '../utils'
import TypeName from './TypeName'
import Dots from './svgs/Dots'
import CachedImage from 'react-native-expo-cached-image'
import { Locale } from '../utils'

interface Props {
  pokemon: Pokemon,
  index: number,
  navigation: any
}

const PokemonCard: React.FC<Props> = ({pokemon, index, navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => {navigation.navigate('PokemonScreen', {pokemon: pokemon})}}>
      <View style={[
        Style.pokemonCard, {
          backgroundColor: getTypeBackgroundColor(pokemon.types[0])
        }]
      }>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={Style.pokemonNumber}>#{fixId(pokemon)}</Text>
            <Dots style={[Style.cardDots, {left: 70, top: -15}]} color={BackgroundColors.white} height={32} width={74}/>
          </View>
          <Text style={Style.pokemonName}>{getName(pokemon.names, Locale.locale)}</Text>
          <View style={Style.pokemonTypesName}>
            {pokemon.types.map((t, idx) => 
              <TypeName type={t} key={`${pokemon.dex_numbers.nat}-${pokemon.form_name}-${index}-type-${idx}`}/>
            )}
          </View>
        </View>
        <CachedImage resizeMode='contain' style={Style.pokemonCardImage} source={{uri: pokemon.sprites.find(sprite => sprite.name === 'artwork')!.url}}/>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PokemonCard
