import DexNumber from './DexNumber'
import FlavorText from './FlavorText'
import Name from './Name'
import PokemonAbility from './PokemonABility'
import Sprite from './Sprite'
import Stats from './Stats'

export default interface Pokemon {
  base_friendship: number
  catch_rate: number
  egg_groups: number[]
  gender_rate: number
  category: Name[]
  growth_rate: string
  has_gender_difference: boolean
  dex_numbers: DexNumber
  names: Name[]
  height: number
  weight: number
  types: number[]
  form_name: string
  form_type: string
  sprites: Sprite[]
  abilities: PokemonAbility[]
  flavor_texts: FlavorText[]
  stats: Stats[]
}
