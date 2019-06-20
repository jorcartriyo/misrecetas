//Modulo para la Cabecera de los avisos
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation';
import { Icon, Left } from 'native-base';

class Header extends Component {
    constructor(props) {
    super(props)
    }
    add() {

        this.props.navigation.navigate('AgregaReceta')
    }
    render() {
        
        return (
            <View style={styles.content}>
                <Left>
                    <Icon onPress={() => this.add()} name="md-add-circle" size={50} style={styles.containerButton} />
                
                 
                </Left>
                <Text style={styles.textCenter}>CREAR RECETA</Text>
            </View>
        )
    }
 
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#81C04d',
        flexDirection: 'row'
    },
    containerButton: {
        color: 'white',
        marginLeft: 25
    },
    textCenter: {
        flex: 1,
        flexDirection:'row',
        textAlign: 'left',
        fontWeight: 'bold',
        marginRight: 80,
        fontSize: 18,
        marginTop: 2

    }
})
export default withNavigation(Header);