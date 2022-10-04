import Category from "./Category"
import FlavorText from "./FlavorText"
import Name from "./Name"
import PokemonAbility from "./PokemonABility"
import Stats from "./Stats"

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
  flavor_texts: FlavorText[]
  stats: Stats[]
}
