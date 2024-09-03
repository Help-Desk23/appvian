import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image } from "react-native";

import FondoProforma from '../assets/fondo/fondo.png';

const Proforma = ({ nombre, telefono, modelo, plazo, precioDolares, precioBolivianos, inicialDolares, inicialBolivianos, cuotaMes, asesor, id_asesores, id_sucursal, imagen}) => {
    return (
        <View style= {styles.container}>
            <Image source={FondoProforma} style = {[styles.image, StyleSheet.absoluteFill]} />
            <View style= {styles.imageContainer}>
              <Image source={{ uri: imagen}} style= {styles.imageMoto} resizeMode="contain" />
            </View>
            <View style= {styles.infoCliente}>
              <Text>{modelo}</Text>
            </View>
            <StatusBar style="auto" />
        </View> 
     );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    image: { 
      width: "100%",
      height: "50%",
    },
    imageMoto: {
      width: 350,
      height: 250,
      top: -150
    }
  });


export default Proforma;


/*
        <View style={styles.container}>
            <Text style={styles.title}>Proforma</Text>
            <Image source={{ uri: imagen }} style={styles.image} />
            <Text>Cliente: {nombre}</Text>
            <Text>Teléfono: {telefono}</Text>
            <Text>Modelo: {modelo}</Text>
            <Text>Plazo: {plazo} meses</Text>
            <Text>Precio: {precioDolares} $US / {precioBolivianos} Bs</Text>
            <Text>Inicial: {inicialDolares} $US / {inicialBolivianos} Bs</Text>
            <Text>Cuota Mensual: {cuotaMes} $US</Text>
            <Text>Asesor: {asesor}</Text>
            <Text>ID Asesor: {id_asesores}</Text>
            <Text>ID Sucursal: {id_sucursal}</Text>
        <StatusBar style="auto" />
        </View>
*/