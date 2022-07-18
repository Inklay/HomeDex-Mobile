import { TypeBackgroundColors } from "./style"
import Pokemon from './classes/Pokemon'

export function getTypeBackgroundColor(pokemon: Pokemon) : string {
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