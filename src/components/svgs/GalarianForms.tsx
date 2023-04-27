import React from 'react'
import { Image } from 'react-native'
import GalarianFormsPNG from '../../../assets/images/GalarianForms.png'

const GalarianForms = (props: any) => (
  <Image style={{
      width: props.width,
      height: props.height,
      tintColor: props.color
    }}
    source={GalarianFormsPNG}
  />
)

export default GalarianForms
