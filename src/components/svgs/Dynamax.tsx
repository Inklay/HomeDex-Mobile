import React from 'react'
import { Image } from 'react-native'
import DynamaxPNG from '../../../assets/images/Dynamax.png'

const Dynamax = (props: any) => (
  <Image style={{
      width: props.width,
      height: props.height,
      tintColor: props.color
    }}
    source={DynamaxPNG}
  />
)

export default Dynamax
