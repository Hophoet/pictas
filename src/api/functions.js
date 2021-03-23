import { resolve } from 'path';
import { firestore, storage, timestamp } from '../firebase/config'


function getPictureClient(clientId){
   return new Promise( (resolve, reject) => {
        firestore
        .collection('clients')
        .doc(clientId)
        .onSnapshot( documentSnapshot => {
			if(documentSnapshot.data()){
				resolve(documentSnapshot.data());
			}
			//client is not available, maybe deleted
			else{
				reject('client not exists');
			}
        })

   })
}

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
    const picRef = storage.ref('pictures/'+file.name);
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
            userId:userId,
            createdAt:timestamp
        }
        firestore
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
        firestore
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
        firestore
        .doc('clients/'+clientId)
        .update(client)
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
        firestore
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


// get client with id
function getClient(id){
    return new Promise( (resolve, reject) => { 
        firestore
        .collection('clients')
        .doc(id)
		.onSnapshot( (documentSnapshot) => {
			//client is available case
			if(documentSnapshot.data()){
				resolve(documentSnapshot.data());
			}
			//client is not available, maybe deleted
			else{
				reject('client not exists');
			}
		})
    })
}


function clientPasswordExists(password){
	return new Promise( (resolve, reject) => {
		firestore
		.collection('clients')
        .get()
        .then( (querySnapshot) => {
                querySnapshot.forEach( documentSnapshot  => {
                    if(documentSnapshot.data()){
                        console.log(documentSnapshot.data())
                        if(documentSnapshot.data().password == password){
                            resolve(true);
                        }
                    }
                }); 
                resolve(false);
        })
        .catch(error => {
            reject(error);
        })
    })
}


function clientUsernameExists(name){
	return new Promise( (resolve, reject) => {
		firestore
		.collection('clients')
        .get()
        .then( (querySnapshot) => {
                querySnapshot.forEach( documentSnapshot  => {
                    if(documentSnapshot.data()){
                        console.log(documentSnapshot.data())
                        if(documentSnapshot.data().name == name){
                            resolve(true);
                        }
                    }
                }); 
                resolve(false);
        })
        .catch(error => {
            reject(error);
        })
    })
}


function getClientPictures(userId, clientId){
   return new Promise( (resolve, reject) => {
       firestore
       .collection('pictures')
       .where('userId', '==', userId)
       .where('clientId', '==', clientId)
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


export {
    getPictures,
    getClients,
    uploadImage,
    setPicture,
    getPictureClient,
    addClient,
    updateClient,
    deleteClient,
    clientPasswordExists,
    clientUsernameExists,
    getClientPictures,
    getClient
}