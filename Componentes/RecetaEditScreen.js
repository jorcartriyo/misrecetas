import React, { Component } from 'react'
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Picker
} from 'react-native'

import NavbarReceta from './NavbarReceta'
import ImagePicker from 'react-native-image-picker'

import Icon from 'react-native-vector-icons/FontAwesome'
/* import RNFetchBlob from 'react-native-fetch-blob' */

import Database from '../Database';

const db = new Database();

/* const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
 */
export default class RecetaEditScreen extends Component {
  static navigationOptions = {
    title: 'Edit Receta',
  };

  constructor() {
    super();
    this.state = {
      uid: '',
      titulo: '',
      categoria: '',
      ingredientes: '',
      imagen: '',
      preparacion: '',
      isLoading: false,
      sinc: '0',
      imagePath: '',
      PickerValue: ''
    };
  }

  componentDidUpdate(){
    const { navigation } = this.props;
     db.recetasById(navigation.getParam('uid')).then((data) => {
      
       const receta = data;
       console.log('entro en datos' + receta.categoria);  
      console.log('uid3 '+ receta.uid)
       this.setState({
         uid: receta.uid,
         titulo: receta.titulo,
         categoria: receta.categoria,
         ingredientes: receta.ingredientes,
         imagen: receta.imagen,
         preparacion: receta.preparacion,
         isLoading: false,
         sinc: '0',
        PickerValue: receta.categoria
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      } 
    })
  }
  clickme = () => {
    var data = this.state.PickerValue;
    if (data == "") {
      alert("Por favor selecciona una categoría");
    } else {
      alert(data);
    }

  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateRecetas() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    let data = {
      uid: this.state.uid,
      titulo: this.state.titulo,
      categoria: this.state.categoria,
      ingredientes: this.state.ingredientes,
      imagen: this.state.imagen,
      preparacion: this.state.preparacion,
      sinc: this.state.sinc,
    }
    db.updateRecetas(data.recetaUid, data).then((result) => {
      console.log(result);
      this.setState({
        isLoading: false,
      });
      this.props.navigation.state.params.onNavigateBack;
      this.props.navigation.navigate('DetalleReceta')
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    })
  }
  openImagepicker() {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('Error' + response.error)
      } else if (response.customButton) {
        console.log('User tapped custon button' + response.customButton)
      } else {
        this.setState({
          imagePath: response.uri,
          imageHeight: response.height,
          imageWidth: response.width
        })
      }
    })
  }
  cierra = async () => {
    this.props.navigation.navigate('DetalleReceta');
  } 
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <NavbarReceta icon="times" texto='Edita Receta' showMenu={this.cierra
        } />
        <View style={styles.content}>
          <ScrollView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

              <View>
                <View style={styles.containerImage}>
                  {this.state.imagePath ? <Image
                    style={{ width: 100, height: 100, flex: 1, marginRight: 10 }}
                    source={{ uri: this.state.imagePath }}
                  /> : null}
                  <TouchableHighlight
                    style={[styles.button, { flex: 2, justifyContent: 'center', alignItems: 'center' }]}
                    onPress={this.openImagepicker.bind(this)}
                  >
                    <Icon name="camera" size={18} color="white" />
                  </TouchableHighlight>
                </View>

                <View style={styles.containerInput}>
                  <Text style={styles.label}>Titulo</Text>
                  <TextInput
                    style={styles.input}
                    value={this.state.titulo}
                    placeholder="Título de la Receta"
                    placeholderTextColor="white"
                    onChangeText={(text) => this.updateTextInput(text, 'titulo')}

                  />
                </View>
                <View style={styles.containerInput}>
                  <Text style={styles.label}>Categoría</Text>
                  <Picker
                    style={styles.label}
                    value={this.state.categoria}
                    style={{ width: '70%', fontSize: 18 }}
                    selectedValue={this.state.PickerValue}
                    onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue, categoria: itemValue})}
                  >
                    <Picker.Item label="Selecciona categoría" value="" />
                    <Picker.Item label="Entrantes" value="Entrantes" />
                    <Picker.Item label="Ensaladas" value="Ensaladas" />
                    <Picker.Item label="Sopas" value="Sopas" />
                    <Picker.Item label="Carnes" value="Carnes" />
                    <Picker.Item label="Pescados" value="Pescados" />
                    <Picker.Item label="Huevos" value="Huevos" />
                    <Picker.Item label="Postres" value="Postres" />
                    <Picker.Item label="Otros" value="Otros" />
                    <Picker.Item label="Mis Recetas" value="Mis Recetas" />
                  </Picker>
                </View>
                <View style={styles.containerInput}>
                  <TextInput
                    multiline
                    style={styles.inputTextArea}
                    value={this.state.ingredientes}
                    placeholder="Ingredientes"
                    placeholderTextColor="white"
                    onChangeText={(text) => this.updateTextInput(text, 'ingredientes')}
                  />
                </View>
                <View style={styles.containerInput}>
                  <TextInput
                    multiline
                    style={styles.inputTextArea}
                    value={this.state.preparacion}
                    placeholder="Preparacion"
                    placeholderTextColor="white"
                    onChangeText={(text) => this.updateTextInput(text, 'preparacion')}
                  />
                </View>
                <View>
                  <TouchableHighlight
                    onPress={this.updateRecetas.bind(this)}
                    style={[styles.button, { marginBottom: 10 }]}
                  >
                    <Text style={styles.saveButtonText}>Cambiar Receta</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  label: {
    flex: 1,
    fontSize: 18
  },
  input: {
    flex: 2,
    fontSize: 18,
    height: 40
  },
  inputTextArea: {
    height: 200,
    flex: 1,
    fontSize: 18
  },
  containerInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#cecece',
    alignItems: 'center',
    marginBottom: 10
  },
  containerImage: {
    flexDirection: 'row'
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 3
  },
  saveButtonText: {
    color: 'white'
  }
})