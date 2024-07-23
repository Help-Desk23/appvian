import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import motoData from "../motosdata";
import fondo from "../assets/fondo/fondo1.png"
import { StatusBar } from "react-native";

const SettingScreem = () => {
  const motos = motoData.motos;
  return(
    <View style = { styles.container}>
      <Text>Setting Screem</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
  }
})

export default SettingScreem;
