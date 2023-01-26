import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import Pokemon from '../classes/Pokemon'
import { BackgroundColors, Style } from '../style'
import { getName, getTypeBackgroundColor, fixId } from '../utils'
import TypeName from './TypeName'
import Dots from './svgs/Dots'
import CachedImage from 'react-native-expo-cached-image'
import DataLocale from '../classes/DataLocale'
import UILocale from '../classes/UILocale'

interface Props {
  pokemon: Pokemon,
  index: number,
  navigation: any,
  dataLocale: DataLocale,
  UILocale: UILocale
}

const PokemonCard: React.FC<Props> = ({pokemon, index, navigation, dataLocale, UILocale}) => {
  return (
    <TouchableWithoutFeedback onPress={() => {navigation.navigate('PokemonScreen', {pokemon: pokemon, dataLocale: dataLocale, UILocale: UILocale})}}>
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
          <Text style={Style.pokemonName}>{getName(pokemon.names, dataLocale.locale)}</Text>
          <View style={Style.pokemonTypesName}>
            {pokemon.types.map((t, idx) => 
              <TypeName dataLocale={dataLocale} type={t} key={`${pokemon.dex_numbers.nat}-${pokemon.form_name}-${index}-type-${idx}`}/>
            )}
          </View>
        </View>
        <CachedImage resizeMode='contain' style={Style.pokemonCardImage} source={{uri: pokemon.sprites.find(sprite => sprite.name === 'artwork')!.url}}/>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PokemonCard
