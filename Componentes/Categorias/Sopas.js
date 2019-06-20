import React, { Component } from 'react';

import { ListItem, List } from 'react-native-elements';
import Database from '../Database';
import { Container, Header, Left, Right, Body, Icon } from 'native-base';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ListView,
    Dimensions,
    TouchableHighlight,
    ActivityIndicator,



} from 'react-native';
import Navbar from './Navbar';
import RecetaHeader from './RecetaHeader';
const db = new Database();
import Helpers from '../lib/helpers'
import * as firebase from 'firebase';
import {
    CachedImage
} from 'react-native-cached-image';

const { width, height } = Dimensions.get('window')
export default class HomeScreen extends Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Image source={require('../icons/pescado.png')} style={{ height: 40, width: 40, borderRadius: 60 }} />
        )


    }
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {

            uid: '',
            isLoading: true,
            dataSource: ds.cloneWithRows([]),
            recetas: [],
            notFound: 'No hay ninguna receta disponible.\nPor favor clicke el botón (+) para agregar.',
            rawRecipes: '',
            categ: 'Pescados'
        };
    }
    /*     filterSearch(text){
            const newData = data.filter(function(item){
                const itemData = item.food.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(newData),
                text: text
            })
        } */
    componentDidMount() {
        //carga las recetas de sqlite
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            this.getRecetas();


        });


        //carga el usuario de firebase y llama a las recetas de firebase
        user = firebase.auth().currentUser

        if (user) {
            console.log('hay usuario')
        } else {
            console.log('no hay usuario')
        }

        try {

            console.log('categoria ' + this.state.categ)
            Helpers.getAllRecipes(this.state.categ, (recipes) => {

                if (recipes) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(recipes),
                        rawRecipes: recipes,
                        isLoading: false,
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    //renderiza las recetas de firebase
    renderRow(rowData) {
        const img = rowData.imagen
        return (

            <TouchableHighlight style={styles.containerCell}
                onPress={() => {
                    this.props.navigation.navigate('DetalleReceta', {
                        'imagen': rowData.imagen,
                        'titulo': rowData.titulo,
                        'categoria': rowData.categoria,
                        'ingredientes': rowData.ingredientes,
                        'preparacion': rowData.preparacion
                    });

                    // db.truncateRecetas();
                    //db.prueba();
                }}
            >

                <View>
                    < CachedImage
                        style={{ width: width, height: 180, padding: 10 }}
                        source={{ uri: img }}
                    />

                    <View style={styles.footerContainer}>
                        <View
                            style={styles.imageUser}
                        >
                            <CachedImage
                                style={styles.imageAvatar}
                                source={{ uri: rowData.imagen }}
                            />
                        </View>

                        <View style={styles.footerTextContainer}>
                            <Text style={styles.text}>{rowData.titulo}</Text>
                            <Text style={[styles.text, styles.textTitle]}>{rowData.categoria}</Text>
                            <Text style={[styles.text, styles.textBy]}>By {rowData.userName}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    //recupera las recetas de firebase
    getRecetas() {
        let recetas = [];
        db.listRecetas('*').then((data) => {
            recetas = data;
            this.setState({
                recetas,
                isLoading: false,
            });
        }).catch((err) => {
            console.log(err);
            this.setState = {
                isLoading: false
            }
        })
    }
    //renderiza las recetas de sqlite
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (

        <ListItem
            title={item.title}
            imagen={item.image}
            subtitle={item.title}


            leftAvatar={{
                name: item.categoria,
                source: item.image && { uri: item.imagen },
                title: item.categoria[0]



            }}

            onPress={() => {
                this.props.navigation.navigate('DetalleReceta', {
                    uid: `${item.uid}`
                });
                // db.truncateRecetas();

            }}
            chevron
            bottomDivider
        />
    )

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }


        if (this.state.recetas.length === 0 && this.state.rawRecipes.length === 0) {
            return (
                <Container>
                    <Header >
                        <Left style={{ flexDirection: 'row' }}>
                            <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
                        </Left>

                        <Right>
                            <Icon name="home" />
                            <Text style={{ alignContent: 'center', color: 'white', fontSize: 22, marginLeft: 15 }}>
                                HOME
                        </Text>
                        </Right>
                    </Header>
                    <View style={styles.fondo}>
                        <ImageBackground source={require('../img/fondo.jpg')}
                            style={styles.imagen}
                        >
                            <RecetaHeader />
                            <Text style={styles.message}>{this.state.notFound}</Text>
                        </ImageBackground>
                        <Navbar />
                    </View>
                </Container>

            );

        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container style={styles.fondo}>
                    <Header >
                        <Left style={{ flexDirection: 'row' }}>
                            <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
                        </Left>
                        <Left style={{ flexDirection: 'row' }}>
                            <Icon name="search" size={35} color="#fff" onPress={() => this.props.navigation.openDrawer()} />

                            <Text style={{ alignContent: 'center', color: 'white', fontSize: 18, marginLeft: 15 }}>Buscar</Text>
                        </Left>
                        <Right>
                            <View>

                            </View>
                            <Icon name="home" />
                            <Text style={{ alignContent: 'center', color: 'white', fontSize: 22, marginLeft: 15 }}>
                                HOME
                        </Text>


                        </Right>


                    </Header>
                    <View style={styles.fondo}>
                        <ImageBackground source={require('../img/fondo.jpg')}
                            style={styles.imagen}
                        >
                            {/*      <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.filterSearch (text)}
                            value={this.state.text}
                        />
 */}


                            <RecetaHeader />


                            <ListView
                                enableEmptySections={true}
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)}
                                style={{ flex: 1, padding: 5 }}
                            />


                            {/*     SQLITE */}
                            {/*          <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.recetas}
                                renderItem={this.renderItem}
                            />   */}
                        </ImageBackground>
                    </View>
                    <Navbar />

                </Container>

            </TouchableWithoutFeedback>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
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
    message: {
        padding: 16,
        fontSize: 18,
        color: 'red',
        backgroundColor: '#F5FCFF',
        borderRadius: 25
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        color: 'red',
        fontSize: 40,
        textAlign: 'center',
        marginTop: 40
    },
    imagen: {
        flex: 1,
        resizeMode: 'stretch',
        padding: 0
    },
    fondo: {
        flex: 1
    },
    icon: {
        width: 24,
        height: 24,
    },
    input: {
        height: 45,
        width: "95%",
        fontSize: 19,
        borderColor: "white",
        borderWidth: 2,
        color: 'white',
        margin: 5,
        borderRadius: 25

    },
    buttonWrapper: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'column',
        backgroundColor: '#00CCFF',
        borderRadius: 4
    },
    buttonText: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
        elevation: 1,
        color: '#FFFFFF'
    },
    footerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#555566'
    },
    imageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 5
    },
    listContainer: {
        marginHorizontal: 10
    },
    text: {
        color: '#fff'
    },
    containerCell: {
        marginBottom: 10
    },
    textInput: {
        height: 30,
        borderWidth: 1,
        backgroundColor: '#81C04d',

        borderColor: '#cecece',
        marginBottom: 10,
        marginHorizontal: 10
    },
    textTitle: {
        fontSize: 13
    },
    textBy: {
        fontSize: 12
    },
    textMenu: {
        fontSize: 20,
        color: '#fff'
    }
});
