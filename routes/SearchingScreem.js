import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View,TextInput, ScrollView, TouchableHighlight} from "react-native";

import Cancelar from '../assets/cancelar.png';

const SettingScreem = () => {

  const [cliente, setCliente] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [motos, setMotos] = useState([]);
  const [sucursales, setSucursales] = useState([]); 

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData('http://192.168.2.246:3000/cliente');
      fetchMotos('http://192.168.2.246:3000/motos'); 
      fetchSucursales('http://192.168.2.246:3000/sucursal');
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  
// FECH PARA CLIENTES

  const fetchData = async (url) => {
    try{
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setFilteredData(json);
    } catch(error){
      console.log(error)
    }
  }

// FECH PARA MOTOS

  const fetchMotos = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setMotos(json);
    } catch (error) {
      console.log(error);
    }
  };

// FECH PARA SUCURSALES

  const fetchSucursales = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setSucursales(json);
    } catch (error) {
      console.log(error);
    }
  };


  const limpiarTexto = () => {
    setCliente('');
  }

  const searchFilterFuction = (text) => {
    if(text){
      const newData = data.filter(item => {
        const itemData = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredData(newData);
    }else{
      setFilteredData(data);
    }
  }

    // Obtener nombre de moto basado en id_motos
    const getMotoNombre = (id_motos) => {
      const moto = motos.find(m => m.id_motos === id_motos);
      return moto ? moto.modelo : 'Moto no encontrada';
    };
  
    // Obtener nombre de sucursal basado en id_sucursal
    const getSucursalNombre = (id_sucursal) => {
      const sucursal = sucursales.find(s => s.id_sucursal === id_sucursal);
      return sucursal ? sucursal.sucursal : 'Sucursal no encontrada';
    };

    const formatFecha = (fecha) => {
      const date = new Date(fecha);
      return date.toLocaleDateString(); // Esto mostrará la fecha en formato local
    };


  return(
    <ScrollView contentContainerStyle ={{ flex: 1}}>
      <View style= {styles.container}>
        <View style= {styles.containerProforma}>
          <Text style={styles.titleProforma }> BUSCAR PROFORMA </Text>
        </View>
        <View style={ styles.containerBuscar}>
            <TextInput 
              placeholder="NOMBRE DEL CLIENTE" 
              style= {styles.input} 
              value={cliente} 
              onChangeText={(text) => {
                setCliente(text);
                searchFilterFuction(text)
              }}/>
            <TouchableHighlight onPress={limpiarTexto}>
              <Image source={Cancelar} style= {styles.iconSearch} />
            </TouchableHighlight>
        </View>

        <View style= {styles.containerCliente}>
          {filteredData.map((item, index) => {
            return(
              <View key={index} style= {styles.gapClientes}>
                <View style={styles.clienteContainer}> 
                  {motos.find(m => m.id_motos === item.id_motos) && (
                    <Image
                      source={{ uri: motos.find(m => m.id_motos === item.id_motos).img_motos }}
                      style={styles.motoImage}
                      resizeMode= "contain"
                  />
                  )}
                </View>
                <View style={styles.clienteInfo}>
                  <Text> {item.nombre}</Text>
                  <Text> {getMotoNombre(item.id_motos)}</Text>
                  <Text> {getSucursalNombre(item.id_sucursal)}</Text>
                  <Text> {formatFecha(item.fecha)} </Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerProforma: {
    backgroundColor: "#cd2027",
    height: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  titleProforma: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "white",
    top: 20
  },
  containerBuscar: {
    flexDirection: "row",
    gap: 50,
    marginTop: 100,
  },
  iconSearch: {
    height: 40,
    width: 40
  },
  input: {
    borderBottomWidth: 1,
    width: "70%",
    textAlign: "center",
    borderBottomColor: '#ccc',
  },
  containerCliente: {
    gap: 20,
    top: 40
  },
  gapClientes: {
    flexDirection: "row",
  },
  motoImage: {
    width: 100,
    height: 100,
  },
  clienteInfo: {
    justifyContent: 'center',
  },
});

export default SettingScreem;