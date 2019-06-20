//Pantalla de registro del usuario

import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text, ImageBackground, ScrollView,
  TouchableWithoutFeedback, View,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
var icono = 'eye'
export default class RegistroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'jorcartriyo@hotmail.com', password: '123456', response: '', status: true };
  }
  createAccount = async user => {
    try {
      console.log(this.state.email, this.state.password)
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      this.setState({
        response: 'Cuenta creada con éxito!!'
      })
       await AsyncStorage.setItem('logged', '1');
      alert('usuario insertado')
      this.props.navigation.navigate('Home');
    } catch (error) {
      alert('error')
      this.setState({
        response: error.toString()
      })
    }
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

  _back = async () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={require('../img/fondo.jpg')}
          style={styles.imagen}
        >
          <ScrollView style={styles.fondo} >
            <Text style={styles.welcome}>MIS RECETAS</Text>
            <Text style={styles.welcome1}>REGISTRO</Text>
            <TextInput
              style={styles.input}
              placeholder="   Usuario"
              placeholderTextColor='black'
              onChangeText={(username => this.setState({ username }))}
              value={this.state.username}
            />
            <TextInput
              style={styles.input}
              placeholder="   Email"
              placeholderTextColor='black'
              placeholderFontWeight='bold'
              placeholderFontSize='40'
              onChangeText={(email => this.setState({ email }))}
              value={this.state.email}
            />

            <View style={{ flex: 1, flexDirection: 'row' }}>
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
                    name={icono}
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnEnter}
              onPress={this.createAccount}
            >
              <Text style={styles.btnEnterText}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnEnter}
              onPress={this._back.bind(this)}
            >
              <Text style={styles.btnEnterText}>Volver</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback >
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    color: 'blue',
    fontSize: 40,
    textAlign: 'center',
    marginTop: 35,
    fontWeight: 'bold'

  },
  welcome1: {
    color: 'blue',
    fontSize: 40,
    textAlign: 'center',
    marginTop: -10,
    fontWeight: 'bold'
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
    margin: 10,
    borderRadius: 25

  },
  eye: {
    position: 'relative',
    top: 15,
    right: 60
  },
  btnEnter: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#428AF8',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 15,
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