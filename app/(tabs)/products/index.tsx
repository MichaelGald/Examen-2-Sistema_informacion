import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosString = await AsyncStorage.getItem('productos');
        if (productosString) {
          setProductos(JSON.parse(productosString));
        }
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const renderItem = ({}) => (
    <View className='px-2 border-spacing-0 bg-slate-100'>
      <Text className='text-xl font-medium'>Código: </Text>
      <Text className='text-xl font-medium'>Nombre: </Text>
      <Text className='text-xl font-medium'>Categoría: </Text>
      <Text className='text-xl font-medium'>Cantidad: </Text>
      <Text className='text-xl font-medium'>Precio: </Text>
      <Text className='text-xl font-medium'>Fecha Ingreso: </Text>
      <Text className='text-xl font-medium'>Observaciones: </Text>
    </View>
  );

  return (
    <View className='flex-1 px-2 bg-white'>
      <Text className='text-3xl font-bold'>List Products</Text>
      <FlatList
        data={productos}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Index;