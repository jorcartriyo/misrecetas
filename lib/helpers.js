import * as firebase from 'firebase'
//arreglar lo de name
class Helpers {
    static createNewRecipe(userId, obj){
        let userNamePath = "/user/" + userId + "/recipes/" + (userId+'-' + Date.now())
        return firebase.database().ref(userNamePath).set(obj)
    }
    static getUserRecipes(userId, callback) {
        let userNamePath = "/user/"
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            if (snapshot) {
                if (data.recipes) {
                    let obj = {
                        name: data.details.name,
                        url: data.details.url,
                        recipes: data.recipes
                    }
                    callback(obj)
                }
            }
        })
    }
    static getAllRecipes(categ,callback){
        let pathName = "/user/"
        firebase.database().ref(pathName).on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfRecipes = []
            if (data) {                
                for(let key in data){
                    let obj = data[key]             
                    let photo = obj.details                
                    for(let prop in obj){
                        let recipes = obj[prop]               
                        for(let rc in recipes){
                            if (recipes[rc].categoria == categ || categ=='*'                                
                            ) {                          
                                arrayOfRecipes.push({
                                    id: recipes[rc].id,
                                    userName: '1',
                                    userPhoto: photo,
                                    titulo: recipes[rc].titulo,
                                    categoria: recipes[rc].categoria,
                                    ingredientes: recipes[rc].ingredientes,
                                    preparacion: recipes[rc].preparacion,
                                    imagen: recipes[rc].imagen
                                })
                            }
                        }
                    }
                }
            }
            callback(arrayOfRecipes)
        })
    } 
 static setUserName(userId, name){
        let userNamePath = "/user/"+userId+"/details/name"
        return firebase.database().ref(userNamePath).set(name)
    }
 
    static setUserBio(userId, bio){
        let userNamePath = "/user/"+userId+"/details/bio"
        return firebase.database().ref(userNamePath).set(bio)
    }

    static setUserPlace(userId, place){
        let userNamePath = "/user/"+userId+"/details/place"
        return firebase.database().ref(userNamePath).set(place)
    }

    static setImageUrl(userId, url){
        let userNamePath = "/user/"+userId+"/details/url"
        return firebase.database().ref(userNamePath).set(url)
    }
    static getImageUrl(userId, callback){
        let userNamePath = "/user/"+userId+"/details/url"
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let imageUrl = ''
            if(snapshot.val()){
                imageUrl = snapshot.val()
            }
            callback(imageUrl)
        })
    }
    static getName(userId, callback){
        let userNamePath = "/user/"+userId+"/details/name"
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let name = ''
            if(snapshot.val()){
                name = snapshot.val()
            }
            callback(name)
        })
    } 
}

module.exports = Helpers