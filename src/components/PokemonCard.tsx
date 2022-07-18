import React from 'react'
import { View, Text, Image  } from 'react-native'
import Pokemon from '../classes/Pokemon'
import { BackgroundColors, Style } from '../style'
import { getName, getTypeBackgroundColor } from '../utils'
import TypeName from './TypeName'
import Dots from './svgs/Dots'
import { convertCompilerOptionsFromJson } from 'typescript'

interface Props {
  pokemon: Pokemon,
  index: number
}

const PokemonCard: React.FC<Props> = ({pokemon, index}) => {
  function fixId() : string {
    if (pokemon.id < 10)
      return `00${pokemon.id}`
    if (pokemon.id < 100)
      return `0${pokemon.id}`
    else
      return pokemon.id.toString()
  }
  return (
    <View style={[
      Style.pokemonCard, {
        backgroundColor: getTypeBackgroundColor(pokemon.types[0])
    }]}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={Style.pokemonNumber}>#{fixId()}</Text>
          <Dots style={Style.cardDots} color={BackgroundColors.white} height={32} width={74}/>
        </View>
        <Text style={Style.pokemonName}>{getName(pokemon.names, 'fr')}</Text>
        <View style={Style.pokemonTypesName}>
          {pokemon.types.map((t, idx) => 
            <TypeName type={t} key={`${pokemon.id}-${pokemon.form_name}-${index}-type-${idx}`}/>
          )}
        </View>
      </View>
      <Image resizeMode='contain' style={Style.pokemonCardImage} source={{
        uri: pokemon.sprite
      }}/>
    </View>
  )
}

export default PokemonCard
