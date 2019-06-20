//Pantalla para editar el perfil del usuario actual

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image, TouchableWithoutFeedback, Keyboard
} from 'react-native';
var estado = 'disable';
import { Container, Header, Left, Right, Content, Item, Input, Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { USERINFO } from './RegistroScreen';

export const USERINFO1 =
{
    name: 'Pedro', subname: 'Pérez', addres: 'C/ la pava, nº 5', email: 'pedro@hotmail.com', username: 'Pedro', password: '12345', ruta: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNF1Ycvuuh-ynHvwPwaWTe52a1H8Zt0F21jNDnbE-IlPXzmRGpw'
 };
var edita = false;

export default class PerfilScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', subname: '', addres: '', email: '', username: '', password: '', ruta: '',           
            imagePath: 'response.uri', imageHeight: '', imageWhidth: ''
        };
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header >
                        <Left style={{ flexDirection: 'row' }}>
                            <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
                        </Left>
                        <Right>
                            <Icon name="person-add"/>
                            <Text style={{ alignContent: 'center', color: 'white', fontSize: 22, marginLeft:15}}>                            
                                EDITAR PERFIL
                            </Text>
                    
                        </Right>
                    </Header>
                    <View style={styles.fondo}>
                        <ImageBackground source={require('../img/fondo.jpg')}
                            style={styles.imagen}
                        >
                            <Content>
                                <View>                            
                                    <Text style={styles.welcome}><Icon name="camera" /> FOTO:</Text>
                                    {this.state.imagePath ? <Image style={{ width: 100, height: 100, marginLeft: 100,flex:1, flexDirection:'row' }} source={{ uri: this.state.imagePath } }/> : null}
                                </View>
                                <Item style={{ borderColor: 'green', borderBottomWidth: 2 }}>
                                    <Icon name="person" />
                                    <Text style={styles.welcome}>NOMBRE:</Text>
                                    <Input
                                        style={{ fontSize: 16, marginTop: 5, flex: 3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        placeholderTextColor='red'
                                        placeholder={USERINFO.name}  
                                        onChangeText={(name => this.setState({ name }))}
                                        value={this.state.name}
                                    />                                
                                </Item>
                                <Item style={{ borderColor: 'green', borderBottomWidth: 2 }}>
                                    <Icon name="person" />
                                    <Text style={styles.welcome}>APELLIDOS:</Text>
                                    <Input
                                        style={{ fontSize: 16, marginTop: 5, flex:3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        placeholderTextColor='red'                     
                                        placeholder={USERINFO.subname}
                                        onChangeText={(subname => this.setState({ subname }))}
                                        value={this.state.subname}
                                    />
                                </Item>
                                <Item style={{ borderColor: 'green', borderBottomWidth: 2 }}>
                                    <Icon name="home" />
                                    <Text style={styles.welcome}>DIRECCIÓN:</Text>
                                    <Input
                                        style={{ fontSize: 16, marginTop: 5, flex: 3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        placeholderTextColor='red'                     
                                        placeholder={USERINFO.addres}
                                        onChangeText={(addres => this.setState({ addres }))}
                                        value={this.state.addres}/>
                                </Item>
                                <Item style={{ borderColor: 'green', borderBottomWidth: 2 }}>
                                    <Icon name="mail" />
                                    <Text style={styles.welcome}>EMAIL:</Text>
                                    <Input
                                        style={{ fontSize: 16, marginTop: 5, flex: 3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        placeholderTextColor='red'                       
                                        placeholder={USERINFO.email}
                                        onChangeText={(email => this.setState({ email }))}
                                        value={this.state.email}/>
                                </Item>
                                <Item style={{ borderColor: 'green', borderBottomWidth: 2 }}>
                                    <Icon name="person" />
                                    <Text style={styles.welcome}>USUARIO:</Text>
                                    <Input
                                        style={{ fontSize: 16, marginTop: 5, flex: 3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        placeholderTextColor='red'
                                        placeholder={USERINFO.username}
                                        onChangeText={(username => this.setState({ username }))}
                                        value={this.state.username}/>
                                </Item>
                                <Item style={{ borderColor: 'green', borderBottomWidth: 2 }}>
                                    <Icon name="eye" />
                                    <Text style={styles.welcome}>CONTRASEÑA:</Text>
                                    <Input
                                        style={{ fontSize: 16, marginTop: 5, flex: 3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        secureTextEntry={true}
                                        placeholderTextColor='red'                  
                                        placeholder={USERINFO.password}                                    
                                        onChangeText={(password => this.setState({ password }))}
                                        value={this.state.password}
                                    />
                                </Item>
                            </Content>

                            <TouchableOpacity
                                style={styles.btnEnter}
                                onPress={this._set}                        >
                                <Text style={styles.btnEnterText}>Grabar Cambios</Text>
                            </TouchableOpacity>

                            <TouchableOpacity     

                                style={styles.btnEnter}
                                onPress={this.openImagePicker.bind(this)}
                            >
                                <Icon name="camera" marginRight size={18} color="white" />
                                <Text style={styles.btnEnterText}>    Foto</Text>
                        
                            </TouchableOpacity>
                            

                        </ImageBackground>
                    </View>
                </Container>
            </TouchableWithoutFeedback>
        );
    }
    _set = async () => {

        if (this.state.name != '') {            
            USERINFO1.name = this.state.name;
        }
        if (this.state.username != '') {
            USERINFO1.username = this.state.username;
        }
        if (this.state.addres != '') {
            USERINFO1.addres = this.state.addres;
        }
        if (this.state.subname != '') {
            USERINFO1.subname = this.state.subname;
        }
        if (this.state.email != '') {
            USERINFO1.email = this.state.email;
        }
        if (this.state.password != '') {
            USERINFO1.password = this.state.password;
        }
        if (this.state.ruta != '') {
            USERINFO1.ruta = this.state.ruta;
        }
   
        this.props.navigation.navigate('Perfil', { USERINFO1 });

    }
    openImagePicker() {
        const options = {
            title: 'Select Imagen',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                alert('Usuario cancelado')
            } else if (response.error) {
                alert('Error ' + response.error)
            } else if (response.customButton) {
                alert('Custon Boton ' + response.customButton)
            } else {
                this.setState({
                    imagePath: response.uri,
                    imageHeight: response.imageHeight,
                    imageWhidth: response.imageWhidth
               
                })  
                //Convierto la imagen a base 64 por si me hace falta
                base64img ='data:image/jpeg;base64,' + response.data          
               USERINFO1.ruta =response.uri
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#F5FCFF',

    },
    welcome: {
        flex: 2,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        color: 'white',
        fontSize: 18,
        textAlign: 'left',
        marginTop: 5,
    },
    imagen: {
        flex: 1,
        resizeMode: 'stretch',
        padding: 0
    },
    btnEnter: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#428AF8',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 20,
        marginRight: 15,
        height: 40,
        padding: 10,
        borderRadius: 25
    },
    fondo: {
        flex: 1
    },
    icon: {
        width: 24,
        height: 24,
    }, btnEnterText: {
        color: '#ffffff',
        fontWeight: '200',
        fontSize: 25,
    }
});