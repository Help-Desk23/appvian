import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View,TextInput, ScrollView, TouchableHighlight, Keyboard } from "react-native";
import axios from "axios";
import { StatusBar } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Cancelar from '../assets/cancelar.png';

const SettingScreem = () => {

  const [cliente, setCliente] = useState('');

  const limpiarTexto = () => {
    Keyboard.dismiss();
    setCliente('');
  }


  return(
    <ScrollView contentContainerStyle ={{ flex: 1}}>
      <View style= {styles.container}>
        <View style= {styles.containerProforma}>
          <Text style={styles.titleProforma }> BUSCAR PROFORMA </Text>
        </View>
        <View style={ styles.containerBuscar}>
            <TextInput placeholder="NOMBRE DEL CLIENTE" style= {styles.input} value={cliente} onChangeText={setCliente}/>
            <TouchableHighlight onPress={limpiarTexto}>
              <Image source={Cancelar} style= {styles.iconSearch} />
            </TouchableHighlight>
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
  }
});

export default SettingScreem;