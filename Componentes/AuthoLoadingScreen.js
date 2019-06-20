//MÃ³dulop que comprueba si el usuario que accede estÃ¡ logeado, si lo estÃ¡ lo dirige a la pantalla Home, si no lo dirige a la pantalla Login

import React, { Component } from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
});
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends React.Component {
    static KEY_LOGGED_IN_USER = 'logged'

    constructor(props) {
        super(props);
        this.navigateAsync = this.navigateAsync.bind(this);
        this.navigateAsync();
    }

    async navigateAsync() {
        AuthLoadingScreen.isLoggedIn().then(() => {
            this.props.navigation.navigate('Home');
        }, () => {
            this.props.navigation.navigate('Login');
        });
    }
    getInitialView() {
        firebase.auth().onAuthStateChanged((user) => {
            let initialView = user ? 'Login' : 'Home'
            this.navigateAsync = this.navigateAsync.bind(this);
            this.navigateAsync();
            this.setState({
                userLoaded: true,
                initialView
            })
        })
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function () {
                let initialView = user ? 'Login' : 'Home'
                this.navigateAsync = this.navigateAsync.bind(this);
                this.navigateAsync();
                this.setState({
                    userLoaded: true,
                    initialView
                })
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch(function (error) {             
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }


    
    static isLoggedIn() {
        return new Promise(((resolve, reject) => {
            AsyncStorage.getItem(AuthLoadingScreen.KEY_LOGGED_IN_USER, (exception, userObj) => {
                if (userObj) {
                    resolve(userObj);
                }
                reject(userObj);
            });
        }));
    }

    render() {

        return (

            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}