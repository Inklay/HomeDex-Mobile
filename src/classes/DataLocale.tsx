export default interface DataLocale {
  locale: string
  name: string
  types: {
    normal: string
    fire: string
    water: string
    electric: string
    grass: string
    ice: string
    fighting: string
    poison: string
    ground: string
    flying: string
    psychic: string
    bug: string
    rock: string
    ghost: string
    dragon: string
    dark: string
    steel: string
    fairy: string
  }
  egg_groups: {
    monster: string
    water_1: string
    water_2: string
    water_3: string
    bug: string
    flying: string
    field: string
    fairy: string
    human_like: string
    mineral: string
    amorphous: string
    dragon: string
    grass: string
    ditto: string
    no_egg: string
  }
  growth_rate: {
    slow: string
    medium: string
    fast: string
    medium_slow: string
    slow_then_very_fast: string
    fast_then_very_slow: string
  }
}