import React from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

const Normal = ({ ...props }: SvgProps ) => (
  <Svg
    viewBox='0 0 25 25'
    fill='none'
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25 12.5C25 19.404 19.404 25 12.5 25S0 19.404 0 12.5 5.596 0 12.5 0 25 5.596 25 12.5Zm-5.357 0a7.143 7.143 0 1 1-14.286 0 7.143 7.143 0 0 1 14.286 0Z"
      fill={props.color}
    />
  </Svg>
)

export default Normal
