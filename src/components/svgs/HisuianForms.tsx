import React from 'react'
import { Image } from 'react-native'
import HisuianFormsPNG from '../../../assets/images/HisuianForms.png'

const HisuianForms = (props: any) => (
  <Image style={{
      width: props.width,
      height: props.height,
      tintColor: props.color
    }}
    source={HisuianFormsPNG}
  />
)

export default HisuianForms
