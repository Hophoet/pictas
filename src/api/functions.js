import { resolve } from 'path';
import { firestore, storage } from '../firebase/config'


function getPictures(userId){
   return new Promise( (resolve, reject) => {
       firestore
       .collection('pictures')
       .where('userId', '==', userId)
       .get()
       .then( (querySnapshot) => {
            let pictures = []
            querySnapshot.forEach( documentSnapshot  => {
                if(documentSnapshot.data()){
                    pictures.push(documentSnapshot.data())
                }
            }); 
            resolve(pictures);
       })
       .catch(error => {
           reject(error);
       })
   })
}


function uploadImage(userId, file){
    return new Promise( (resolve, reject) => {
    const picRef = firestore.ref(file.name);
    const colRef = firestore.collection('pictures');
    const task = picRef.putFile(file)
    task.then(() => {
        picRef.getDownloadURL()
        .then((downloadURL) => {
            resolve(downloadURL); 
        })
        .catch((error) => {
            reject(error);
        })
    } )
    

})
}

function setPicture(userId, clientId, url){
    return new Promise( (resolve, reject) => {
        let picture = {
            clientId:clientId,
            url:url,
            userId:userId
        }
        firestore()
        .collection('pictures')
        .add(picture)
        .then(snapshot => {
            picture.id = snapshot.id;
            snapshot.set(picture);
        })
        .then(pictureData => {
            resolve(pictureData);
        })
        .catch(error => {
            reject(error);
        })
    })
}

function deletePicture(id, url){
    return new Promise( (resolve, reject) => { 
        storage.refFromURL(url)
        .delete()
        .then(response => {
            firestore
            .collection('pictures')
            .doc(id)
            .delete()
            .then( response =>{
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
        })
        .catch(error => {
            reject(error);
        })
    })
}




//CLIENTS
function getClients(userId){
   return new Promise( (resolve, reject) => {
       firestore
       .collection('clients')
       .where('userId', '==', userId)
       .get()
       .then( (querySnapshot) => {
            let clients = []
            querySnapshot.forEach( documentSnapshot  => {
                if(documentSnapshot.data()){
                    clients.push(documentSnapshot.data())
                }
            }); 
            resolve(clients);
       })
       .catch(error => {
           reject(error);
       })
   })
}

function addClient(userId, name, password){
    return new Promise( (resolve, reject) => {
        let client = {
            userId:userId,
            name:name,
            password:password
        }
        firestore()
        .collection('clients')
        .add(client)
        .then(snapshot => {
            client.id = snapshot.id;
            snapshot.set(client);
        })
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error)
        })

    })
}

function updateClient(clientId, name, password){
    return new Promise( (resolve, reject) => {
        let client = {
            name:name,
            password:password
        }
        firestore()
        .doc('clients/'+clientId)
        .update(client => {

        })
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        })

    })
}

function deleteClient(id){
    return new Promise( (resolve, reject) => { 
        firestore()
        .collection('clients')
        .doc(id)
        .delete()
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        })
    })
}

export {
    getPictures,
    getClients,
    uploadImage
}