import React from 'react'
import { View, Text } from 'react-native'
import Pokemon from '../classes/Pokemon'
import { Style } from '../style'
import { getTypeBackgroundColor } from '../utils'

interface Props {
  pokemon: Pokemon
}

const PokemonCard: React.FC<Props> = ({pokemon}) => {

  const language = 'fr'

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
      <Text style={Style.pokemonNumber}>#{fixId()}</Text>
      <Text style={Style.pokemonName}>{pokemon.names.find(n => n.language == language)?.name}</Text>
    </View>
  )
}

export default PokemonCard
