import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, TextInput, TouchableHighlight, Alert, Modal} from "react-native";
import { StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useRoute } from "@react-navigation/native";
import Proforma from "../components/proforma";

// IMG HONDA
import Honda from '../assets/hondavi.png';





const HomeScreem = () => {
  const route = useRoute();

  const { asesor, id_asesores, id_sucursal } = route.params;

  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [plazo, setPlazo] = useState('');
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [precioDolares, setPrecioDolares] = useState('');
  const [precioBolivianos, setPrecioBolivianos] = useState('');
  const [inicialDolares, setInicialDolares] = useState('');
  const [inicialBolivianos, setInicialBolivianos] = useState('');
  const [imagen, setImagen] = useState('');
  const [ costoVarios, setCostoVarios ] = useState({ interes_anual: 0, formulario: 0 });
  const [showAlert, setShowAlert] = useState(false);
  const [ modalVisible, setModalVisible] = useState(false);
  const [modeloSeleccionado, setModeloSeleccionado] = useState('');

  const tipoCambio = 6.97;

  // MOTOS

  const fetchMoto = async () => {
    try{
      const response = await axios.get("http://192.168.2.246:3000/motos");
      setData(response.data);
    } catch(error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const handleModeloChange = (value) => {
    setSelectedValue(value);
    const motoSeleccionada = data.find(moto => moto.id_motos === value);
    if (motoSeleccionada) {
      setImagen(motoSeleccionada.img_motos);
      setPrecioDolares(motoSeleccionada.precious);
      setPrecioBolivianos((motoSeleccionada.precious * tipoCambio).toFixed(2));
      setModeloSeleccionado(motoSeleccionada.modelo);
    } else {
      setPrecioDolares('');
      setPrecioBolivianos('');
      setImagen('');
      setModeloSeleccionado('');
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


  // POST CLIENTE

  const handlePress = async () => {
    try {
      const response = await axios.post("http://192.168.2.246:3000/cliente", {
        nombre: nombreCliente,
        telefono: telefonoCliente,
        plazo: parseInt(plazo),
        precious: precioDolares,
        inicialbs: inicialBolivianos,
        cuota_mes: calcularCuotaMensual(),
        id_motos: selectedValue,
        id_asesores: id_asesores,
        id_sucursal: id_sucursal,
      });
      setShowAlert(true);
      setModalVisible(true);
    } catch (error) {
      console.error("Error al procesar la proforma", error);
      Alert.alert("Error", "No se pudieron almacenar los datos");
    }
  };

// GET CUOTA FIJA

const fetchCostoVarios = async () => {
  try {
    const response = await axios.get('http://192.168.2.246:3000/costo');

    if (Array.isArray(response.data) && response.data.length > 0) {
      setCostoVarios(response.data[0]); 
    } else {
      console.error("Datos no esperados de la API");
    }
  } catch (error) {
    console.error("Error en la consulta", error);
  }
};

useEffect(() => {
  fetchMoto();
  fetchCostoVarios();
},[]);


  // CUOTA MENSUAL

  const calcularCuotaMensual = () => {
    const costoMoto = precioDolares
    const inicialBs = inicialBolivianos / tipoCambio
    const interesAnual = costoVarios.interes_anual / 12
    const costoFormulario = costoVarios.formulario / tipoCambio
    const plazoMes = plazo

    const montoFinanciando = costoMoto - inicialBs
    const factorInteres = Math.pow(1 + interesAnual, plazoMes)
    const cuotaMensual = (montoFinanciando * interesAnual * factorInteres) / ( factorInteres - 1)
    const cuotaTotal = cuotaMensual + costoFormulario

    return cuotaTotal.toFixed(2);
  }


  return ( 
    <ScrollView>
      <View style={ styles.container }>
        <Image source = { Honda } style = { styles.icon }/>
        <Text style = { styles.proforma }>PROFORMA</Text>
        <Image source={imagen ? { uri: imagen } : require('../assets/Navi/navi.png')} style={ styles.motosh} />
        <TextInput placeholder= "NOMBRE DEL CLIENTE"  style = { styles.textInput } value={nombreCliente} onChangeText={setNombreCliente} />
        <TextInput placeholder= "TELEFONO DEL CLIENTE" style = { styles.textInput } keyboardType="numeric" value={telefonoCliente} onChangeText={setTelefonoCliente} />
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
              value={plazo}
              onChangeText={setPlazo}    
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
      <Modal 
        animationType="slide" 
        transparent= {false} 
        visible= {modalVisible} 
        onRequestClose={() => {
        setModalVisible(false);
        }}>
            <Proforma 
              nombre={nombreCliente}
              telefono={telefonoCliente}
              modelo={modeloSeleccionado}
              plazo={plazo}
              precioDolares={precioDolares}
              precioBolivianos={precioBolivianos}
              inicialDolares={inicialDolares}
              inicialBolivianos={inicialBolivianos}
              cuotaMes={calcularCuotaMensual()}
              asesor={asesor}
              id_asesores={id_asesores}
              id_sucursal={id_sucursal}
              imagen={imagen} 
            />
      </Modal>
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
  },
});
 
export default HomeScreem;