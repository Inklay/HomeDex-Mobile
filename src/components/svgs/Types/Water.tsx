import React from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

const Water = ({ ...props }: SvgProps ) => (
  <Svg
    viewBox='0 0 17 25'
    fill='none'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.61 16.92c0 4.463-3.63 8.08-8.11 8.08-4.48 0-8.11-3.617-8.11-8.08C.39 12.58 8.061.662 8.482.011c.01-.015.026-.015.036 0 .42.65 8.092 12.57 8.092 16.91Zm-9.462 5.49c-4.115-.9-3.411-5.46-3.411-5.46s1.124 2.752 3.85 3.644c2.728.891 6.024-.416 6.024-.416s-2.348 3.132-6.463 2.232Z'
      fill={props.color}
    />
  </Svg>
)

export default Water
