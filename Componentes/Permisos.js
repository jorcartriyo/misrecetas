//Modulo que Se carga al principio de la aplicación y comprueba si tiene los permisos necesarios
import React from 'react';
//import react in our code. 
import { View, Text, StyleSheet, PermissionsAndroid, Alert, Platform } from 'react-native';
//import all the components we are going to use.

export default class Permisos extends React.Component {
    UNSAFE_UNSAFE_componentWillMount= () => {
        //Checking for the permission just after component loaded
        async function requestCameraPermission() {
            try {
                const grantedPhone = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA, {
                        'title': 'AndoridPermissionExample App Camera Permission',
                        'message': 'AndoridPermissionExample App needs access to your camera '
                    }
                )
                const grantedCamera = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CALL_PHONE, {
                        'title': 'AndoridPermissionExample App pHONE Permission',
                        'message': 'AndoridPermissionExample App needs access to your PHONE '
                    }
                )
                const grantedContact = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                        'title': 'AndoridPermissionExample App pHONE Permission',
                        'message': 'AndoridPermissionExample App needs access to your PHONE '
                    }
                )
                if (!grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    alert ('Permiso de cámara denegado');

                }
                if (!grantedPhone=== PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    alert('Permiso de llamadas denegado');
                }
                if (!grantedContact=== PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    alert('Permiso de acceso a contactos denegado');
                }
            } catch (err) {
                alert("err", err);
                console.warn(err)
            }
        }
        if (Platform.OS === 'android') {
            //Calling the permission function
            requestCameraPermission();
        } else {
            alert('IOS device found');
        }
    }
    render() {
        return (
            <View >

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        padding: 16
    },
    boldText: {
        fontSize: 30,
        color: 'red',
    }
})