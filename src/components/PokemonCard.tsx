import React from 'react'
import { View, Text } from 'react-native'
import Pokemon from '../classes/Pokemon'
import { Style, TypeBackgroundColors } from '../style'

interface Props {
  pokemon: Pokemon
}

const PokemonCard: React.FC<Props> = ({pokemon}) => {

  const language = 'fr'

  function getBackgroundColor() : string {
    switch (pokemon.types[0]) {
      case 2:
        return TypeBackgroundColors.fighting
      case 3:
        return TypeBackgroundColors.flying
      case 4:
        return TypeBackgroundColors.poison
      case 5:
        return TypeBackgroundColors.ground
      case 6:
        return TypeBackgroundColors.rock
      case 7:
        return TypeBackgroundColors.bug
      case 8:
        return TypeBackgroundColors.ghost
      case 9:
        return TypeBackgroundColors.steel
      case 10:
        return TypeBackgroundColors.fire
      case 11:
        return TypeBackgroundColors.water
      case 12:
        return TypeBackgroundColors.grass
      case 13:
        return TypeBackgroundColors.electric
      case 14:
        return TypeBackgroundColors.psychic
      case 15:
        return TypeBackgroundColors.ice
      case 16:
        return TypeBackgroundColors.dragon
      case 17:
        return TypeBackgroundColors.dark
      case 18:
        return TypeBackgroundColors.fairy
    }
    return TypeBackgroundColors.normal
  }

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
        backgroundColor: getBackgroundColor()
    }]}>
      <Text style={Style.pokemonNumber}>#{fixId()}</Text>
      <Text style={Style.pokemonName}>{pokemon.names.find(n => n.language == language)?.name}</Text>
    </View>
  )
}

export default PokemonCard
