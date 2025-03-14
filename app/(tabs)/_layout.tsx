import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
            backgroundColor: 'white'
        },
        tabBarActiveBackgroundColor: 'blue'
    }}>
        <Tabs.Screen
            name='home/index'
            options={{
                title: 'Ingresar',
                tabBarIcon: ({color, size}) => (
                    <FontAwesome name='inbox' color={color} size={size}/>
                )
            }}
        />
                <Tabs.Screen
            name='products/index'
            options={{
                title: 'Productos',
                tabBarIcon: ({color, size}) => (
                    <FontAwesome name='amazon' color={color} size={size}/>
                )
            }}
        />

    </Tabs>
  )
}

export default TabsLayout