import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";

const useFormulario = () => {
  const [codigoProducto, setCodigoProducto] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [precioUnitario, setPrecioUnitario] = useState(0.0);
  const [fechaIngreso, setFechaIngreso] = useState(new Date());
  const [observaciones, setObservaciones] = useState("");
  const [errores, setErrores] = useState({
    codigoProducto: "",
    nombreProducto: "",
    cantidad: "",
    precioUnitario: "",
  });

  const validarFormulario = () => {
    let erroresTemp = {
      codigoProducto: "",
      nombreProducto: "",
      cantidad: "",
      precioUnitario: "",
    };
    let esValido = true;

    // Validar nombre
    if (nombreProducto.trim() === "" || nombreProducto.length < 3) {
      erroresTemp.nombreProducto = "El nombre debe tener al menos 3 caracteres";
      esValido = false;
    }

    // Validar cantidad
    if (cantidad <= 0 || !Number.isInteger(cantidad)) {
      erroresTemp.cantidad = "La cantidad debe ser un número entero positivo";
      esValido = false;
    }

    // Validar precio
    if (precioUnitario <= 0) {
      erroresTemp.precioUnitario = "El precio debe ser un número positivo";
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

  const manejarEnvio = async () => {
    if (validarFormulario()) {
      const nuevoProducto = {
        codigoProducto,
        nombreProducto,
        categoria,
        cantidad,
        precioUnitario,
        fechaIngreso: fechaIngreso.toISOString().split("T")[0],
        observaciones,
      };

      let productos = [];

      try {
        const productosGuardados = await AsyncStorage.getItem("productos");
        if (productosGuardados !== null) {
          productos = JSON.parse(productosGuardados);
        }
      } catch (error) {
        console.error("Error leyendo de AsyncStorage:", error);
      }

      productos.push(nuevoProducto);

      try {
        await AsyncStorage.setItem("productos", JSON.stringify(productos));
        Alert.alert("Éxito", "Producto guardado correctamente");
      } catch (error) {
        console.error("Error guardando en AsyncStorage:", error);
        Alert.alert("Error", "No se pudo guardar el producto");
      }

      try {
        const fileUri = FileSystem.documentDirectory + "productos.json";
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(productos));
        console.log("Producto guardado en archivo JSON");
      } catch (error) {
        console.error("Error guardando en archivo JSON:", error);
      }

      // Limpiar los campos 
      setCodigoProducto("");
      setNombreProducto("");
      setCategoria("");
      setCantidad(1);
      setPrecioUnitario(0.0);
      setFechaIngreso(new Date());
      setObservaciones("");
    } else {
      Alert.alert("Error", "Por favor completa todos los campos correctamente");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Codigo Producto</Text>

      <TextInput
        style={styles.input}
        placeholder="Código Producto"
        value={codigoProducto}
        onChangeText={setCodigoProducto}
      />
      <Text style={styles.text}>Nombre Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre Producto"
        value={nombreProducto}
        onChangeText={setNombreProducto}
      />
      <Text style={styles.text}>Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />
      <Text style={styles.text}>Cantidad</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={cantidad.toString()}
        onChangeText={(text) => setCantidad(parseInt(text))}
        keyboardType="numeric"
      />
      <Text style={styles.text}>Precio Unitario</Text>
      <TextInput
        style={styles.input}
        placeholder="Precio Unitario"
        value={precioUnitario.toString()}
        onChangeText={(text) => setPrecioUnitario(parseFloat(text))}
        keyboardType="numeric"
      />
      <Text style={styles.text}>Fecha Ingreso</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha Ingreso"
        value={fechaIngreso.toISOString().split("T")[0]}
        onChangeText={(text) => setFechaIngreso(new Date(text))}
      />
      <Text style={styles.text}>Observaciones</Text>
      <TextInput
        style={styles.input}
        placeholder="Observaciones"
        value={observaciones}
        onChangeText={setObservaciones}
      />
      <TouchableOpacity style={styles.boton} onPress={manejarEnvio}>
        <Text style={styles.textoBoton}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: "blue",
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  text: {
    textAlign: "auto",
    fontSize: 18,
    fontStyle: "italic",
  },
  boton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
  },
  textoBoton: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default useFormulario;
