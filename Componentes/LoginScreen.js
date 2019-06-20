//Primera pantalla de Login

import React from 'react';
import {
  StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground, ScrollView,  TouchableWithoutFeedback,
  Keyboard,View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase'
var icono = 'eye';
export default class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = { username: 'Jorge', email: 'jorcartriyo@hotmail.com', password: '123456', status: true, initialView: null, response: '', userLoaded: false };
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(function () {
          var provider = new firebase.auth.GoogleAuthProvider();
          // In memory persistence will be applied to the signed in Google user
          // even though the persistence was set to 'none' and a page redirect
          // occurred.
          return firebase.auth().signInWithRedirect(provider);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });
  } 
  //Para entrar con conexion 
  login = async () => {
    try {  
    await firebase
      .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        AsyncStorage.setItem('logged', '1');
        this.props.navigation.navigate('Home') 
      })         
    } catch (error) {
         this.setState({
          response: error.toString()
        })
        alert('Email o contraseña Erróneos')
      }
  };

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name='power-off' style={{ fontSize: 28, color: tintColor, flexDirection:'row' }}></Icon>
    )
  }
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <ImageBackground source={require('../img/fondo.jpg')} 
           style={styles.imagen}
      > 
           <ScrollView style={styles.fondo} >
            <Text style={styles.welcome}>MIS RECETAS</Text>
            <Text style={styles.welcome1}>ACCESO</Text>
            <TextInput
              style={styles.input}
              placeholder="   Usuario"
              onChangeText={(username => this.setState({ username }))}
             value={this.state.username}            
            />
            <TextInput
              style={styles.input}
              placeholder="   Email"
              onChangeText={(email => this.setState({ email }))}
              value={this.state.email}
            />
            <View style = {{ flex: 1,flexDirection: 'row'}}>
            <TextInput
              style={styles.input}
              placeholder="   Contraseña"
              onChangeText={(password => this.setState({ password }))}
              value={this.state.password}
              secureTextEntry={this.state.status}
              />
              <View style={styles.eye}>
                <TouchableOpacity onPress={this.clicked.bind(this)}>
                    <Icon
                      name= {icono}
                      size={40}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>

            </View>
            <TouchableOpacity
              style={styles.btnEnter}
              onPress={this.login}
              >
                
              <Text style={styles.btnEnterText}>Aceder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnEnter}
              onPress={this._create}
            >
              <Text style={styles.btnEnterText}>Crear Cuenta</Text>
            </TouchableOpacity> 
            <TouchableOpacity
              style={styles.btnEnter}
              onPress={this._logout}
            >
              <Text style={styles.btnEnterText}>Deslogearse</Text>
            </TouchableOpacity> 
          </ScrollView>      
        </ImageBackground>
       
        </TouchableWithoutFeedback>
    );
  }

  //Para entrar cuando no hay conexion
    _signin = async () => {
     if (USERINFO.username === this.state.username && USERINFO.password === this.state.password) {
       if (this.state.userLoaded) {
         await AsyncStorage.setItem('logged', '1');
         this.props.navigation.navigate('Home');
      } 
    } else {
      alert('Usuario o Contraseña Incorrectos')
    }

  } 
  _create = async () => {
    this.props.navigation.navigate('Registro');
  } 
  _logout = async () => {
    await AsyncStorage.clear
    alert('Usuario deslogeado');
  }
  clicked() {
    this.setState({
      status: !this.state.status
    })
    if (this.state.status === true) {
      icono = 'eye-slash'
    } else {
      icono = 'eye'

      
    }
    return icono
  }
} 


 const styles = StyleSheet.create({
    welcome: {
        color: 'blue',
        fontSize: 40,
        textAlign: 'center',
        marginTop: 35,    
     fontWeight: 'bold',
        fontFamily: 'Zocial'

   },
       welcome1: {
        color: 'blue',
        fontSize: 40,
         textAlign: 'center',
         marginTop: -10,
        fontWeight: 'bold'   
   },
   eye: {
     position: 'relative',     
     top: 15,
     right: 60
   },
    input: {      
      height: 45,
      width: "95%",
      fontSize: 20,
      borderColor: "blue",
      paddingVertical: 0,
      paddingHorizontal: 15,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      borderWidth: 2,
      color: '#ffffff',
      margin: 15,
      borderRadius: 25, 
     position: 'relative'
    },
    btnEnter: {
      justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#428AF8',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 20,
        marginRight: 15,
        padding: 10,
        borderRadius: 25        
    },

    btnEnterText: {
        color: '#ffffff',
        fontWeight: '200',
        fontSize: 19,
    },
    imagen: {
        flex: 1,
        resizeMode: 'stretch',
        padding: 0
     },
      fondo: {
         flex: 1
     }
});