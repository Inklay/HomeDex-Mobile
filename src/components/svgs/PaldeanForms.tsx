import React from 'react'
import { Image } from 'react-native'
import PaldeanFormPNG from '../../../assets/images/PaldeanForm.png'

const PaldeanForm = (props: any) => (
  <Image style={{
      width: props.width,
      height: props.height,
      tintColor: props.color
    }}
    source={PaldeanFormPNG}
  />
)

export default PaldeanForm
