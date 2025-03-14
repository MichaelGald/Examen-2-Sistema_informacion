import { View, Text } from "react-native";
import React from "react";
import EnvioProducts from "@/components/EnvioProducts";

const index = () => {
  return (
    <View className="max-w-3xl w-full bg-gray-100 mt-4 px-4">
      <Text className="text-3xl font-bold">Envio Products</Text>
      <EnvioProducts />
    </View>
  );
};

export default index;
