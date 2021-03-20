import { resolve } from 'path';
import { firestore } from '../firebase/config'


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
    const task = picRef.put(file)
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




export {
    getPictures,
    getClients,
    uploadImage
}