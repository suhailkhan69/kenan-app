import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
const Custombtn = ({ title,handlePress,containerStyles,textStylrs,isLoading}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

export default Custombtn