import React, { Component } from 'react';
import { ScrollView, StyleSheet, Slider, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Database from '../Database';
import Navbar from './Navbar';
import { Container } from 'native-base';
const db = new Database();
import Tts from 'react-native-tts';
import Helpers from '../lib/helpers'
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  CachedImage
} from 'react-native-cached-image';
export default class RecetaDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Detalles de recetas',
  }
          
  constructor(props) {
    super(props);
    this.state ={
      isLoading: true,
      imagen: '',
      titulo:'',
      categoria: '',
      ingredientes: '',
      preparacion: '',
      speechRate: 0.5,
      speechPitch: 1, 
      speechRate: 0.5,
      speechPitch: 1,
    } 
    Tts.setDefaultRate(this.state.speechRate);
    Tts.setDefaultPitch(this.state.speechPitch);
  }
  setSpeechRate = async rate => {
    await Tts.setDefaultRate(rate);
    this.setState({ speechRate: rate });
  };

  setSpeechPitch = async rate => {
    await Tts.setDefaultPitch(rate);
    this.setState({ speechPitch: rate });
  };
  setSpeechRate = async rate => {
    await Tts.setDefaultRate(rate);
    this.setState({ speechRate: rate });
  };

  setSpeechPitch = async rate => {
    await Tts.setDefaultPitch(rate);
    this.setState({ speechPitch: rate });
  };
  _speek() {   
    Tts.speak(this.props.navigation.state.params.preparacion);
  }
  stop() {
    Tts.stop();
  }
  render() {
    return (
      <Container>
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
              <View>
                <View>
                  <Text style={styles.textos}>IMAGEN:</Text>
                </View>
                <CachedImage
                style={{width: 300, height: 150, alignItems: 'center'}}
                  source={{ uri: this.props.navigation.state.params.imagen}}
              />
            </View>
            <View>
                <Text style={styles.textos}>TÍTULO DE LA RECETA:</Text>         
            </View>
              <View>
                <View>
                  <Text style={styles.textos}>{this.props.navigation.state.params.titulo.toUpperCase()}</Text>
              </View>
              <View>
                <Text style={styles.textos}>CATEGORÍA:</Text>
              </View>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.props.navigation.state.params.categoria}</Text>
            </View>
            <View>
              <Text style={styles.textos}>INGREDIENTES:</Text>
            </View>
            <View>
                <Text style={{ fontSize: 18 }}>{this.props.navigation.state.params.ingredientes}</Text>
              </View>
              

                        
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.textos}>PREPARACIÓN:</Text>

                            
              </View>
              
              <View style={{ flex: 1, flexDirection: 'row'}}>
                <Text style={{ fontSize: 18 }}>{this.props.navigation.state.params.preparacion}</Text>
                <TouchableOpacity onPress={() => this._speek()}>

             
                </TouchableOpacity>
            </View>        
          </View>
          <View style={styles.detailButton}>
              <Button         
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title='Reproducir Preparación'
                onPress={() => this._speek()
                }
                icon={
                  <Icon
                    style={{
                      position: 'relative',
                      top: 2,
                      right: 5
                    }}
                    name="play"
                    size={40}
                    color="#000"
                  />
                }
              />
            </View>
            <View style={styles.detailButton}>
              <Button
                large
                backgroundColor={'#CCCCCC'}
                leftIcon={{ name: 'edit' }}
                title='Parar Preparación'
                onPress={() => this.stop()
                }
                icon={
                  <Icon
                    style={{
                      position: 'relative',
                      top: 2,
                      right: 25
                    }}
                    name="stop"
                    size={40}
                    color="#000"
                  />
                }
              />
            </View>
            <Text />
            <Text />
            <View>
              <Text>{`Speed: ${this.state.speechRate.toFixed(2)}`}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.01}
                maximumValue={0.99}
                value={this.state.speechRate}
                onSlidingComplete={this.setSpeechRate}
              />
            </View>

            <View>
              <Text>{`Pitch: ${this.state.speechPitch.toFixed(2)}`}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={2}
                value={this.state.speechPitch}
                onSlidingComplete={this.setSpeechPitch}
              />
            </View>      
        </Card>     
        </ScrollView>
        <Navbar />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2
  },
  subContainer: {
    flex: 1,
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  textos: {
    textAlign: 'center',
    fontSize: 22,
    color: 'blue',
    marginBottom: 10,
    marginTop: 20
  },
  textos: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
    marginTop: 20
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 10
  }
})
