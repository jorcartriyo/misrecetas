
//Pantalla para conocer el perfil del usuario actual y poder acceder a la modificación

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
import Navbar from './Navbar';
import { USERINFO1 } from './EditPerfil';
var edita = false;

export default class PerfilScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', subname: '', addres: '', email: '', username: '', password: '', ruta: USERINFO1.ruta
        };  
      


    }
    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon name='person' style={{ fontSize: 30, color: tintColor , padding: 0}}></Icon>
        ),
        fontSize:35
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
                            <Icon name="person" />
                            <Text style={{ alignContent: 'center', color: 'white', fontSize: 22, marginLeft: 15}}>
                                PERFIL
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
                                    <Image style={{ width: 100, height: 100, marginLeft: 100 }} source={{
                                        uri: USERINFO1.ruta
                                }} />
                                </View>

                                <Item style={{ borderColor: 'green', borderBottomWidth: 2, flex:2, flexDirection:'row' }}>  
                                
                                    <Icon name="person" />                         
                                    <Text style={styles.welcome}>NOMBRE:</Text>                        
                                    <Input                                    
                                        style={{ fontSize: 18, marginTop: 5, flex: 3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        placeholderTextColor='black'              
                                        placeholder={USERINFO1.name}
                                        disabled
                                        onChangeText={(name => this.setState({ name }))}
                                        value={USERINFO1.name}
                                    />                                                      
                                </Item>  

                                <Item style={{ borderColor: 'green', borderBottomWidth: 2}}>  
                                    <Icon name="person" /> 
                                    <Text style={styles.welcome}>APELLIDOS:</Text>
                                    <Input
                                    style={{ fontSize: 18, marginTop: 5,  flex: 3, flexDirection: 'row' ,justifyContent: 'flex-start'}}
                                    placeholderTextColor='black'
                                    disabled
                                    placeholder={USERINFO1.subname}
                                    onChangeText={(subname => this.setState({ subname }))}
                                    value={USERINFO1.subname}/>
                                </Item>  
                                <Item style={{ borderColor: 'green', borderBottomWidth: 2 }}>
                                    <Icon name="home" /> 
                                    <Text style={styles.welcome}>DIRECCIÓN:</Text>
                                    <Input
                                        style={{ fontSize: 18, marginTop: 5, flex: 3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        placeholderTextColor='black'
                                        disabled
                                        placeholder={USERINFO1.addres}
                                        onChangeText={(addres => this.setState({ addres }))}
                                        value={USERINFO1.addres}/>
                                </Item>  
                                <Item style={{ borderColor: 'green', borderBottomWidth: 2 }}>
                                    <Icon name="mail" /> 
                                    <Text style={styles.welcome}>EMAIL:</Text>
                                    <Input
                                        style={{ fontSize: 18, marginTop: 5, flex: 3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        placeholderTextColor='black'
                                        disabled
                                        placeholder={USERINFO1.email}
                                        onChangeText={(email => this.setState({ email }))}
                                        value={USERINFO1.email}/>
                                </Item>  
                                <Item style={{ borderColor: 'green', borderBottomWidth: 2 }}>
                                    <Icon name="person" /> 
                                    <Text style={styles.welcome}>USUARIO:</Text>
                                    <Input
                                        style={{ fontSize: 18, marginTop: 5, flex: 3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        placeholderTextColor='black'
                                        disabled
                                        placeholder={USERINFO1.username}
                                        onChangeText={(username => this.setState({ username }))}
                                        value={USERINFO1.username}/>
                                </Item>  
                                <Item style={{ borderColor: 'green', borderBottomWidth: 2 }}>
                                    <Icon name="eye" /> 
                                    <Text style={styles.welcome}>CONTRASEÑA:</Text>
                                    <Input
                                        style={{ fontSize: 18, marginTop: 5, flex: 3, flexDirection: 'row', justifyContent: 'flex-start' }}
                                        placeholderTextColor='black'
                                        disabled
                                        placeholder={USERINFO1.password}
                                        secureTextEntry={true}
                                        onChangeText={(password => this.setState({ password }))}
                                        value={USERINFO1.password}
                                    />
                                </Item>  
                            </Content>
                            
                            <TouchableOpacity
                                style={styles.btnEnter}
                                onPress={this._set}                        >
                                <Text style={styles.btnEnterText}>Editar</Text>
                            </TouchableOpacity>

    {/*                         <TouchableOpacity
                                style={styles.btnEnter}
                                onPress={this.openImagePicker.bind(this)}                        >
                                <Text style={styles.btnEnterText}>Foto</Text>
                            </TouchableOpacity> */}
                
                        </ImageBackground>

                    </View>
                    <Navbar />
                </Container>              
            </TouchableWithoutFeedback>
        );
    }
    _set = async () => {
        this.props.navigation.navigate('EditPerfil');
    }
/*     openImagePicker() {
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
                }else if(response.error){
                   alert('Error ' + response.error)               
                }else if(response.customButton){
                    alert('Custon Boton ' +response.customButton)
                }else {
                   this.setState({
                       imagePath: response.uri,
                       imageHeight: response.imageHeight,
                       imageWhidth: response.imageWhidth
                   })
                }
        })
    } */

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
        marginBottom: 25,
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