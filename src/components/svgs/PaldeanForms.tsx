import React from 'react'
import { Image } from 'react-native'
import PaldeanFormsPNG from '../../../assets/images/PaldeanForms.png'

const PaldeanForms = (props: any) => (
  <Image style={{
      width: props.width,
      height: props.height,
      tintColor: props.color
    }}
    source={PaldeanFormsPNG}
  />
)

export default PaldeanForms
