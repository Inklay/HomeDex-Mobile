export default interface Locale {
  locale: string
  home: {
    description: string
    searchPlaceholder: string
    filters: {
      filters: string
      description: string
      types: string
      forms: {
        forms: string
        mega: string
        gigantamax: string
        alolan: string
        galarian: string
        hisuian: string
        other: string
      }
    }
  }
  pokemonScreen: {
    about: {
      about: string
      data: {
        data: string
        category: string
        height: string
        weight: string
        catch_rate: string
        base_friendship: string
        growth_rate: {
          growth_rate: string
          slow: string
          medium: string
          fast: string
          medium_slow: string
          slow_then_very_fast: string
          fast_then_very_slow: string
        }
      }
      abilities: {
        abilities: string
        ability: string,
        hidden: string
      }
      breeding: {
        breeding: string,
        gender_ratio: string
        egg_group: string
        genderless: string
      }
    }
    stats: {
      stats: string
    }
  }
}
