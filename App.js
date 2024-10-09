import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import Uri from './assets/fondo.jpg';
import Icon from './assets/vian.png';
import Honda from './assets/honda.png';
import { BlurView } from 'expo-blur';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import HomeScreem from './routes/HomeScreem';
import SearchingScreem from './routes/SearchingScreem';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Loading from './components/loading';




function LoginScreem (){

  const url = 'http://192.168.2.30:4000/login';

  const [usuario, setUsername] = React.useState('');
  const [contraseña, setPassword] = React.useState('');
  const [infoAsesores, setInfoAsesores] = React.useState('');
  const [loading, setLoading] =React.useState(true);

  const navigation = useNavigation();


  const handleSignIn = () => {
    axios
    .post(url, {
      usuario,
      contraseña
    })
    .then(response => {
      if(response.data){
        const { nombre, id_asesores, id_sucursal } = response.data.asesor;
        setInfoAsesores(nombre)
        navigation.navigate('Home', { asesor: nombre, id_asesores, id_sucursal });
        Alert.alert(`Bienvenido ${response.data.asesor.nombre}`);
      } else{
        Alert.alert('Credencial Incorrecta')
      }
      console.log(response.data)
    })
    .catch(error => {
      Alert.alert('Usuario o Contraseña Incorrecta')
    })
  }

  const handleLoadingComplete = () => {
    setLoading(false); 
  };

  if (loading) {
    return <Loading onComplete={handleLoadingComplete} />;
  }

  return(
    <View style={styles.container}>
    <Image source={Uri} style = {[styles.image, StyleSheet.absoluteFill]} />
    <Image source={Honda} style={{width:200, height:200, position: 'absolute'}}/>
    <ScrollView contentContainerStyle = {{
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: 'center',
      justifyContent:'center'
    }}>
      <BlurView intensity={90}>
        <View style={styles.login}>
          <Image source={Icon} style = {styles.icon} />
          <View>
            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white'}}> Usuario </Text>
            <TextInput onChangeText={ text => setUsername(text) } style={styles.input} placeholder='Usuario' value={usuario} />
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white'}}> Password </Text>
            <TextInput onChangeText={text => setPassword(text)} style={styles.input} placeholder='Password' value={contraseña} secureTextEntry={true} />
          </View>
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white'}}> Login </Text> 
          </TouchableOpacity>
        </View>
      </BlurView>
    </ScrollView>
    <StatusBar style="auto" />
  </View>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: "#cd2027"
      }}>
        <Tab.Screen 
          name='Login' 
          component={LoginScreem} 
          options={{ headerShown: false, tabBarButton: () => null, tabBarLabel: () => null, tabBarStyle: { display: 'none'} }} />
        <Tab.Screen 
          name='Home' 
          component={HomeScreem} 
          options={{ 
            headerShown: false,
            tabBarLabel: "Calcular",
            tabBarIcon: ({color, size}) => (
              <Entypo name="calculator" size={size} color={color} />
            )
          }}
          />
        <Tab.Screen 
          name='Searching' 
          component={SearchingScreem} 
          options={{ 
            headerShown: false,
            tabBarLabel: "Buscar",
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="search" size={size} color={color} />
            )
          }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  login: {
    width: 350,
    height: 500,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    borderColor: "#fff",
    marginVertical: 30,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1
  }
});
