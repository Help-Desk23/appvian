import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { StatusBar } from "react-native";

const SettingScreem = () => {


  return(
    <View style = { styles.container} >
      <Text> Screen Setting </Text>
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
