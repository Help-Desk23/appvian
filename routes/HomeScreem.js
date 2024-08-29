import axios from "axios";
import { cloneElement, useEffect, useState } from "react";
import { ScrollView, Text, View, Image, TextInput, TouchableHighlight} from "react-native";
import { StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

// IMG HONDA
import Honda from '../assets/hondavi.png';





const HomeScreem = () => {

  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [precioDolares, setPrecioDolares] = useState('');
  const [precioBolivianos, setPrecioBolivianos] = useState('');
  const [inicialDolares, setInicialDolares] = useState('');
  const [inicialBolivianos, setInicialBolivianos] = useState('');
  const [imagen, setImagen] = useState('');
  const [showAlert, setShowAlert] = useState(null);

  const tipoCambio = 6.97;

  const fetchMoto = async () => {
    try{
      const response = await axios.get("http://192.168.2.246:3000/motos");
      setData(response.data);
    } catch(error) {
      console.error("Error al obtener los datos", error);
    }
  };

  useEffect(() => {
    fetchMoto();
  },[]);

  const handleModeloChange = (value) => {
    setSelectedValue(value);
    const motoSeleccionada = data.find(moto => moto.id_motos === value);
    if (motoSeleccionada) {
      setImagen(motoSeleccionada.img_motos);
      setPrecioDolares(motoSeleccionada.precious);
      setPrecioBolivianos((motoSeleccionada.precious * tipoCambio).toFixed(2));
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
    }
  };

  const handleInicialBolivianosChange  = (text) => {
    setInicialBolivianos(text);

    if(!isNaN(parseFloat(text))) {
      const inicialDolares = parseFloat(text) / tipoCambio;
      setInicialDolares(inicialDolares.toFixed(2));
    }
  };


  // POST CLIENTES




  const handlePress = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };
  


  return ( 
    <ScrollView>
      <View style={ styles.container }>
        <Image source = { Honda } style = { styles.icon }/>
        <Text style = { styles.proforma }>PROFORMA</Text>
        <Image source={imagen ? { uri: imagen } : require('../assets/Navi/navi.png')} style={ styles.motosh} />
        <TextInput placeholder= "NOMBRE DEL CLIENTE"  style = { styles.textInput }/>
        <TextInput placeholder= "TELEFONO DEL CLIENTE" style = { styles.textInput } keyboardType="numeric" />
        <Text style = { styles.textM }> MODELO </Text>
        <View style = { styles.select }>
          <RNPickerSelect
            placeholder={{ label: 'Seleccione una moto', value: null }}
            items={data.map(moto => ({ label: moto.modelo, value: moto.id_motos }))}
            onValueChange={handleModeloChange}
            value={selectedValue}
          />
        </View>
        <Text style = { styles.textM }> PLAZO </Text>
        <View style={styles.plazo}>
          <TextInput 
              placeholder="Ingrese Mes" 
              style={styles.textInputPlazo}
              keyboardType="numeric"
              maxLength={2}    
          />
          <Text style={styles.textMeses}> MESES </Text>
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
          keyboardType="numeric"/>
      </View>
      <Text style = { styles.titleInicial }>Incial:</Text>
      <View style = { styles.incialContainer }>
        <TextInput
          placeholder="PRECIO $US"
          value={inicialDolares}
          onChangeText={handleInicialDolaresChange}   
          style = { styles.inicialsus }
          keyboardType="numeric"/>
        <TextInput
          placeholder="PRECIO BS" 
          value={inicialBolivianos}
          onChangeText={handleInicialBolivianosChange}
          style = { styles.inicialbs }
          keyboardType="numeric"/>
      </View>
      <TouchableHighlight style = { styles.button } onPress={ handlePress } >
        <Text style = { styles.textButton }> PROCESAR </Text>
      </TouchableHighlight>
      {showAlert && <Alertproforma onClose={handleClose} />}
      </View>
    </ScrollView>
   );
}


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
  motosh: {
    height: 200,
    width: 300,
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
    top: 10,
  },
  select: {
    width: '60%',
    left: 30
  },
  plazo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 30
  },
  textInputPlazo: {
    borderColor: '#ccc',
    padding: 8,
    textAlign: "center",
    borderBottomWidth: 1,
  },
  textMeses: {
    marginLeft: 10,  
    alignSelf: 'center', 
  },
  monedas: {
    flexDirection: "row",
    gap: 141,
    left: 20,
    top: 15
  },
  text: {
    color: 'grey',
    fontWeight: "bold"
  },
  precioContainer: {
    flexDirection: "row",
    gap: 70,
    top: 10
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
    top: 35
  },
  titleInicial: {
    color: 'grey',
    fontWeight: 'bold',
    left: -155,
    top: 45
  },
  incialContainer: {
    flexDirection: "row",
    gap: 70,
    top: 20
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
    marginTop: 40
  },
  textButton : {
    color: 'white',
    paddingTop: 8,
    paddingLeft: 120 
  }
  
});
 
export default HomeScreem;