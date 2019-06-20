//Barra de navegación del pié
import React, { Component } from 'react'
import { 
  StyleSheet,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
class Navbar extends Component {
  constructor(props) {
    super(props);
  } 
  render() {
    return (
      <View style={styles.containerNavbar}> 
        <Icon onPress={this._logout.bind(this)} name="power-off" size={30} color="#fff" />
        <Icon onPress={() => this.props.navigation.navigate('Home')} name="home" size={30} color="#fff" />
        <Icon onPress={() => this.props.navigation.navigate('Perfil')} name="user" size={30} color="#fff" />
        <Icon name="apple" onPress={() => this.props.ddd.openDrawer()} size={30} color="#fff"/>
      </View>
    )
  }
  
  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }

}

const styles = StyleSheet.create({
  containerNavbar: {
    backgroundColor: '#1633CA',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingTop: 10
  }
})
export default withNavigation(Navbar);
