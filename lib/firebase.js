import * as firebase from 'firebase'

class Firebase {
    static init(){
        firebase.initializeApp({
            apiKey: 'AIzaSyC3zGnNii-BXPWu_tkKgZvlWxVNyT6euvg',
            authDomain: "recetas-4acef.firebaseapp.com",
            databaseURL: "https://recetas-4acef.firebaseio.com",
            projectId: "recetas-4acef",
            storageBucket: "recetas-4acef.appspot.com",
            messagingSenderId: "9882760144",
            appId: "1:9882760144:web:081625a9719956de"
        });
    }
}

module.exports = Firebase 

//import firebase from 'firebase';

/* class FirebaseSDK {
    constructor() {
        if (!firebase.apps.length) {
            //avoid re-initializing
            firebase.initializeApp({
                apiKey: "AIzaSyC3zGnNii-BXPWu_tkKgZvlWxVNyT6euvg",
                authDomain: "recetas-4acef.firebaseapp.com",
                databaseURL: "https://recetas-4acef.firebaseio.com",
                projectId: "recetas-4acef",
                storageBucket: "recetas-4acef.appspot.com",
                messagingSenderId: "9882760144",
            });
        }
    }

}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK; */