import { Button, Image, Text, View, Modal, StyleSheet } from "react-native";
import fondo from "../assets/fondo/fondo.png";
import axios from "axios";
import { useEffect, useState } from "react";




const Alertproforma = ({visible, message, onClose}) => {

    const [cliente, setCliente] = useState(null);

    useEffect(() => {
      const fetchCliente = async () => {
        try {
          const response = await axios.get('http://10.0.2.2:3000/clientes');
          console.log(response.data)
          setCliente(response.data);
        } catch (error) {
          console.error('Error al obtener cliente:', error);
        }
      };
  
      fetchCliente();
    }, []);



    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <Image source={fondo} style={[styles.image, StyleSheet.absoluteFill]} />
            </View>
        {cliente && cliente.map((clienteInfo) => (
        <View key={clienteInfo.id_motos}>
          <Image source={{uri: clienteInfo.img_motos}} style={ styles.img_motos}/>
        </View>
      ))}
        </Modal>
     );

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    image:{
        width: "100%",
        height:"50%",
    },
    text_proforma:{
      alignItems:"center",
      position:"relative",
    },
    img_motos:{
      width: 300,
      height: 200,
      position: "relative",
      top: -450,
      left: 45
    }
})
export default Alertproforma;