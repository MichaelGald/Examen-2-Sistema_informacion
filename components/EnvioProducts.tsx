import { View, Text } from 'react-native'
import React from 'react'
import useFormulario from '../hooks/useFormulario';

const EnvioProducts = () => {
    return (
        <View className='w-full'>
            {useFormulario()}
        </View>
    )
}

export default EnvioProducts