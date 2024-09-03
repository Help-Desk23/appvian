import { Text, View, StyleSheet, Image } from "react-native";

import FondoProforma from '../assets/fondo/fondo.png';
import { StatusBar } from "expo-status-bar";

const Proforma = ({ nombre, telefono, modelo, plazo, precioDolares, precioBolivianos, inicialDolares, inicialBolivianos, cuotaMes, asesor, id_asesores, id_sucursal, imagen}) => {
    return (
        <View style= {styles.container}>
            <Image source={FondoProforma} style = {[styles.image, StyleSheet.absoluteFill]} />
            <Image source={{ uri: imagen}} style= {styles.imageMoto} resizeMode="contain" />
            <Text style= {styles.modelo}>{modelo}</Text>
            <View style= {styles.nombreCliente}>
              <Text style= {styles.tituloCliente}>Cliente:</Text>
              <Text style= {styles.cliente}> {nombre} </Text>
            </View>
            <View style= {styles.precioMoto}>
              <Text style= {styles.tituloMoto}> Precio Contado: </Text>
              <View style= {styles.precioContainer}>
                <Text style= {styles.costoMoto}> $us. {precioDolares} </Text>
                <Text style= {styles.costoMoto}> Bs. {precioBolivianos} </Text>
              </View>
            </View>
            <View style= {styles.linea}></View>
            <StatusBar barStyles= "light-content" backgroundColor="#202020"/>
        </View> 
     );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#202020"
    },
    image: { 
      width: "100%",
      height: "52%",
    },
    imageMoto: {
      width: 350,
      height: 250,
      top: -70
    },
    modelo: {
      fontSize: 25,
      top: -30,
      fontWeight: "bold",
      color: "white"
    },
    nombreCliente:{
      alignItems: "center",
      top: -20
    },
    tituloCliente: {
      color: "red",
      fontSize: 20,
      fontWeight: "600"
    },
    cliente: {
      fontSize: 18,
      color: "white"
    },
    precioMoto: {
      alignItems: "center",
      top: -5
    },
    tituloMoto: {
      color: "red",
      fontSize: 20,
      fontWeight: "600"
    },
    precioContainer: {
      flexDirection: "row",
      gap: 20
    },
    costoMoto: {
      fontSize: 18,
      color: "white"
    },
    linea: {
      backgroundColor: "black",
      height: 2,
      width: "100%",
      top: 10
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