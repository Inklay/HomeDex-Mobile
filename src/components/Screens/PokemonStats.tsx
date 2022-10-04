import React from 'react'
import { View } from 'react-native'
import Pokemon from '../../classes/Pokemon'

interface Props {
  pokemon: Pokemon
  color: string
}

const PokemonStats: React.FC<Props> = ({pokemon, color}) => {
  return (
    <View>
      
    </View>
  )
}

export default PokemonStats
