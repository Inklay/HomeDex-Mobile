import React from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

const Ice = ({ ...props }: SvgProps ) => (
  <Svg
    viewBox='0 0 25 25'
    fill='none'
    {...props}
  >
    <Path
      d="M12.128 3.65 5.918.575l.188 6.873 5.863 2.904.159-6.702ZM19.021 7.532 18.942.603l-6.038 3.288.074 6.542 6.043-2.901ZM19.018 14.943 25 11.52l-5.985-3.148-5.983 3.143 5.986 3.427ZM11.968 11.521l-5.982 3.422L0 11.516l5.983-3.143 5.985 3.148ZM19.111 22.362l-6.209-3.075.159-6.701 5.863 2.903.187 6.873ZM6.054 15.496l.08 6.929 6.038-3.288-.075-6.542-6.043 2.901Z"
      fill={props.color}
    />
  </Svg>
)

export default Ice
