import React, { useEffect, useState } from "react";
import { Text, View, Alert, Image, Button, TouchableHighlight, ScrollView, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import Honda from '../assets/hondavi.png';
import RNPickerSelect from 'react-native-picker-select';
import motoData from "../motosdata";
import Alertproforma from "../components/alert";


const HomeScreem = () => {

  const motos = motoData.motos

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedPlazo, setSelectedPlazo] = useState(null);
  const [precioDolares, setPrecioDolares] = useState('');
  const [precioBolivianos, setPrecioBolivianos] = useState('');
  const [inicialDolares, setInicialDolares] = useState('');
  const [inicialBolivianos, setInicialBolivianos] = useState('');
  const [imagen, setImagen] = useState(require('../assets/Navi/navi.png'));
  const [showAlert, setShowAlert] = useState(null);

  const tipoCambio  = 6.97

  const Myplazo = [
    {label: '12 MESES', value: '12 MESES'},
    {label: '18 MESES', value: '18 MESES'},
    {label: '24 MESES', value: '24 MESES'},
  ]

  const handlePress = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleModeloChange = async (value) => {
    setSelectedValue(value);
    const motoSeleccionada = motos.find(moto => moto.id === value);
    if (motoSeleccionada) {
      setPrecioDolares(motoSeleccionada.preciosus);
      const precioBs = parseFloat(motoSeleccionada.preciosus.replace(/\$/, '')) * tipoCambio;
      setPrecioBolivianos(precioBs.toFixed(2));
      setImagen(motoSeleccionada.img_motos);
    } else {
      setPrecioDolares('');
      setPrecioBolivianos('');
      setImagen('');
    }
  };
  
  const handleInicialDolaresChange = (text) => {
    setInicialDolares(text);
    
    if (!isNaN(parseFloat(text))) {
      
      const inicialBs = parseFloat(text) * tipoCambio;
      setInicialBolivianos(inicialBs.toFixed(2));
    } else {
      
      setInicialBolivianos('PRECIO Bs.');
    }
  };

  return(
    <ScrollView >
    <View style = { styles.container }>
      <Image source = { Honda } style = { styles.icon }/>
      <Text style = { styles.proforma }>PROFORMA</Text> 
      <Image source={imagen} style = { styles.nrojo } />
      <TextInput placeholder= "NOMBRE DEL CLIENTE"  style = { styles.textInput }/>
      <TextInput placeholder= "TELEFONO DEL CLIENTE" style = { styles.textInput } />
      <Text style = { styles.textM }> MODELO </Text>
      <View style = { styles.select }>
        <RNPickerSelect
        placeholder={{label: 'Seleccione una moto', value: null}}
        items={motos.map(moto => ({ label: moto.modelo, value: moto.id }))}
        onValueChange={handleModeloChange}
        value={ selectedValue }
         />
         </View>
      <Text style = { styles.textM }> PLAZO </Text>
      <View style = { styles.select }>
        <RNPickerSelect
        placeholder={{label: 'Seleccione un plazo', value: null}}
        items={ Myplazo }
        onValueChange={(value) => setSelectedPlazo(value)}
        value={ selectedPlazo } 
        />
      </View>
      <View style = { styles.monedas }>
        <Text style = { styles.text }>$US</Text>
        <Text style = { styles.text }>BS</Text>
      </View>
      <Text style = { styles.titlePrecio }>Precio:</Text>
      <View style = { styles.precioContainer }>
        <TextInput 
          placeholder="PRECIO $US"
          style = { styles.preciosus }
          value={precioDolares}
          keyboardType="numeric" />
        <TextInput 
          placeholder="PRECIO Bs" 
          style = { styles.preciobs }
          value={precioBolivianos}
          editable={false}
          keyboardType="numeric"/>
      </View>
      <Text style = { styles.titleInicial }>Incial:</Text>
      <View style = { styles.incialContainer }>
        <TextInput 
          placeholder="PRECIO $US"
          value={inicialDolares}
          onChangeText={handleInicialDolaresChange}   
          style = { styles.inicialsus }/>
        <TextInput 
          placeholder="PRECIO Bs"
          value={inicialBolivianos}
          editable={false} 
          style = { styles.inicialbs }/>
      </View>
      <TouchableHighlight style = { styles.button } onPress={ handlePress } >
        <Text style = { styles.textButton }> PROCESAR </Text>
      </TouchableHighlight>
      {showAlert && <Alertproforma onClose={handleClose} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  icon: {
    height: 100,
    width: 100,
  },
  proforma: {
    color: 'grey',
    fontWeight: "bold",
    fontSize: 18
  },
  nrojo: {
    height: 200,
    width: 330,
  },
  textInput: {
    borderBottomWidth: 1,
    width: '90%',
    textAlign: "center",
    top: 6,
  },
  textM: {
    color: 'grey',
    fontWeight: 'bold',
    top: 10
  },
  select: {
    width: '60%',
  },
  monedas: {
    flexDirection: "row",
    gap: 141,
    left: 8,
  },
  text: {
    color: 'grey',
    fontWeight: "bold"
  },
  precioContainer: {
    flexDirection: "row",
    gap: 70,
  },
  preciosus: {
    borderBottomWidth: 1,
    width: 125,
    textAlign: "center",
    left: 35
  },
  preciobs: {
    borderBottomWidth: 1,
    width: 125,
    textAlign: "center"
  },
  titlePrecio: {
    color: 'grey',
    fontWeight: 'bold',
    left: -155,
    top: 23
  },
  titleInicial: {
    color: 'grey',
    fontWeight: 'bold',
    left: -155,
    top: 25
  },
  incialContainer: {
    flexDirection: "row",
    gap: 70,
  },
  inicialsus: {
    borderBottomWidth: 1,
    width: 125,
    textAlign: "center",
    left: 35
  },
  inicialbs: {
    borderBottomWidth: 1,
    width: 125,
    textAlign: "center",
  },
  button: {
  backgroundColor: '#cd2027',
  borderRadius: 20,
  height: 40,
  width: 300,
  marginTop: 20
  },
  textButton : {
  color: 'white',
  paddingTop: 8,
  paddingLeft: 120 
  }
})

export default HomeScreem;
