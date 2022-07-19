import Category from "./Category"
import Name from "./Name"
import PokemonAbility from "./PokemonABility"

export default interface Pokemon {
  base_friendship: number | null
  capture_rate: number | null
  egg_groups: number[]
  gender_rate: number
  categories: Category[]
  growth_rate: string
  has_gender_difference: boolean
  id: number
  names: Name[]
  is_default: boolean
  height: number
  weight: number
  types: number[]
  form_name: string
  sprite: string
  abilities: PokemonAbility[]
}