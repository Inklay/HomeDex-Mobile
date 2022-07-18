import { TypeBackgroundColors, TypeColors } from "./style"

export function getTypeBackgroundColor(type: number) : string {
  switch (type) {
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

export function getTypeColor(type: number) : string {
  switch (type) {
    case 2:
      return TypeColors.fighting
    case 3:
      return TypeColors.flying
    case 4:
      return TypeColors.poison
    case 5:
      return TypeColors.ground
    case 6:
      return TypeColors.rock
    case 7:
      return TypeColors.bug
    case 8:
      return TypeColors.ghost
    case 9:
      return TypeColors.steel
    case 10:
      return TypeColors.fire
    case 11:
      return TypeColors.water
    case 12:
      return TypeColors.grass
    case 13:
      return TypeColors.electric
    case 14:
      return TypeColors.psychic
    case 15:
      return TypeColors.ice
    case 16:
      return TypeColors.dragon
    case 17:
      return TypeColors.dark
    case 18:
      return TypeColors.fairy
  }
  return TypeColors.normal
}