// Componente que crea un contenedor para enviar las páginas

import React from 'react';
import { createDrawerNavigator, createAppContainer, DrawerItems} from 'react-navigation'
import { Container } from 'native-base'; 
import { View, SafeAreaView, Image, ScrollView,Dimensions} from 'react-native';
import RegistroScreen from './RegistroScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import AuthLoadingScreen from './AuthoLoadingScreen';
import RecetaAddScreen from './RecetaAddScreen'
import PerfilScreen from './PerfilScreen';
import EditPerfil from './EditPerfil';
import RecetaDetailsScreen from './RecetaDetailsScreen';
import Pescados from './Categorias/Pescados';
/* import Carnes from './Categorias/Carnes';
import Ensaladas from './Categorias/Ensaladas';
import Entrantes from './Categorias/Entrantes';
import Huevos from './Categorias/Huevos';
import MisRecetas from './Categorias/MisRecetas';
import Otros from './Categorias/Otros';
import Postres from './Categorias/Postres';
import Sopas from './Categorias/Sopas' */


const { width } = Dimensions.get('window')
const CustomDrawerComponet = (props) => (
    <SafeAreaView style = {{ flex: 1}}>
        <View style={{ height: 150, backgroundColor: '#06F9E8', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../icons/persons.png')} style={{ height: 80, width: 80, borderRadius: 60 }} />
        </View>
            <ScrollView>
                  <DrawerItems {...props}/>  
            </ScrollView>      
        </SafeAreaView>
)
const MyDrawerNavigator = createDrawerNavigator({
    Home: {       
        screen: HomeScreen
    },
    AuthLoading: {
        screen: AuthLoadingScreen,
        navigationOptions: {
            drawerLabel: () => null,
        }
    }, 
    Login: {
        screen: LoginScreen
    }, 
    Registro: {
        screen: RegistroScreen,
        //Para que no se muestre en el menú
        navigationOptions: {
            drawerLabel: () => null        
        }
    },
     Perfil: {
        screen: PerfilScreen
    },
    Pescados: {
        screen: Pescados
    },
/*     Carnes: {
        screen: Carnes
    },
    Ensaladas: {
        screen: Ensaladas
    },
    Entrantes: {
        screen: Entrantes
    },
    Huevos: {
        screen: Huevos
    },
    MisRecetas: {
        screen: MisRecetas
    },
    Otros: {
        screen: Otros
    },
    Postres: {
        screen: Postres
    },
    Sopas: {
        screen: Sopas
    }, */
     DetalleReceta: {
         screen: RecetaDetailsScreen,
                 navigationOptions: {
             drawerLabel: () => null
         }
    } ,
    EditPerfil: {
        screen: EditPerfil,
            navigationOptions: {
            drawerLabel: () => null        
        }

    },
    AgregaReceta: {
        screen: RecetaAddScreen,
            navigationOptions: {
            drawerLabel: () => null
        }
    },
},
    {
        initialRouteName: 'AuthLoading',
        contentComponent: CustomDrawerComponet,
        drawerBackgroundColor: '#06F9E8',
        contentOptions:{
            activeTintColor: 'orange',
               labelStyle: {
                   fontSize: 15,
             },
        },
        drawerWidth: width,
        drawerType: 'slide',
    });

const MyApp = createAppContainer(MyDrawerNavigator);

class App extends React.Component {
    render() {
        return (
            <Container>
                <MyApp >
                </MyApp >
            </Container>
        );
    }
}//End of App class

export default App;