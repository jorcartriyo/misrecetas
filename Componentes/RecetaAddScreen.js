import React, {Component} from 'react'
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
import Helpers from '../lib/helpers'
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNFetchBlob from 'react-native-fetch-blob'

import Database from '../Database';

const db = new Database();
export default class RecetaAddScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: Date.now(),
      uid: '',
      titulo: '',
      categoria: '',
      ingredientes: '',
      imagen: '',
      preparacion: '',
      isLoading: false,
      sinc: '0',
      imagePath: '',
      PickerValue: '',
      imageHeight: '',
      imageWidth: ''
    }
  }

  UNSAFE_componentWillMount() {  
    try {
      let user = firebase.auth().currentUser
      this.setState({
        uid: user.uid
      })
    } catch (error) {
      console.log(error)
    }
  } 


//actualiza el textImput
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  
   
  }
//para introducir datos en la base de datos sqlite
/*   saveReceta() {
    this.setState({
      isLoading: true,
    });
    let data = {
      uid: Date.now(),
      titulo: this.state.titulo,
      categoria: this.state.categoria,
      ingredientes: this.state.ingredientes,
      imagen:'', 
      preparacion: this.state.preparacion,
      sinc: this.state.sinc

    }
    db.addRecetas(data).then((result) => {
      console.log(result);
      this.setState({
        isLoading: false,
      });
      //this.props.navigation.state.params.onNavigateBack;
      this.setState({  
        titulo: '',
        categoria: '',
        ingredientes: '',
        imagen: '',
        preparacion: '',
        imagePath: '',
        PickerValue: ''
      });
      this.props.navigation.goBack();
      this.props.navigation.navigate('Home')

    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false, PickerValue: ''
      });
    })
    console.log(this.state.uid)
  } */

  

  uploadImage = (uri, imageName, mime = 'image/jpg') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob

      const imageRef = firebase.storage().ref(`${this.state.uid}/images`).child(imageName)
      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
    })
  } 


  //cerrar ventana
  closeView() {
    this.props.navigator.pop()
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
    this.props.navigation.navigate('Home');
  } 

  saveData() {  
    if (this.state.uid) {
      console.log('entro en if 1')
      if (this.state.titulo &&
        this.state.categoria &&
        this.state.ingredientes &&
        this.state.imagePath &&
        this.state.preparacion
      ) {
        console.log('titulo1 ' + this.state.titulo)
        console.log('categoria ' + this.state.categoria)
        console.log('entro en if2')
        try {
          console.log('entro en try')
          this.uploadImage(this.state.imagePath, `${Date.now()}.jpg`)
            .then((responseData) => {
              const obj = {
                
                id: this.state.id,
                titulo: this.state.titulo,
                categoria: this.state.categoria,
                ingredientes: this.state.ingredientes,
                imagen: responseData,
                preparacion: this.state.preparacion
              }
              console.log('mando receta a helper')
              console.log(' los datos1 ' + this.state.titulo)
              console.log(obj)
              console.log('uid' + this.state.uid)
              Helpers.createNewRecipe(this.state.uid, obj)
            })
            
            .done()
          console.log('receta insertada')      

            this.props.navigation.navigate('Home')

        } catch (error) {
          console.log('no estoy insertado la receta')
          console.log(error)
        }
      } else alert('No puede quedar ningún campo vacio')
    } else console.log('else 1')
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } 

    return (
      <View style={styles.container}>
        <NavbarReceta icon="times" texto='Nueva Receta' showMenu={this.cierra} />
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
                    style={{ width: '70%', fontSize: 18 }}
                    selectedValue={this.state.PickerValue}
                    onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue, categoria: itemValue })}
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
              onPress={this.saveData.bind(this)}
              style={[styles.button, { marginBottom: 10 }]}
            >
              <Text style={styles.saveButtonText}>Agregar Receta</Text>
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