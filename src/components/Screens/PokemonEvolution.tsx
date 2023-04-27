import React from 'react'
import { View, Text } from 'react-native'
import Pokemon from '../../classes/Pokemon'
import UILocale from '../../classes/UILocale'
import { Style } from '../../style'
import Spacer from '../Spacer'

interface Props {
  pokemon: Pokemon
  color: string
  UILocale: UILocale
}

const PokemonEvolution: React.FC<Props> = ({pokemon, color, UILocale}) => {
  return (
    <View>
      <Text style={[Style.pokemonScreenTitle, {color: color}]}>{UILocale.pokemonScreen.evo.chain}</Text>
      <Spacer/>
    </View>
  )
}

export default PokemonEvolution
