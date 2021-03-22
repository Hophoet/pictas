
import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import '../styles/ClientModal.css';
import { addClient, updateClient } from '../api/functions';

const ClientModal = ({ getClients, toggleModal, setSelectedPicture, selectedPicture, user, client}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(client.name && client.password){
            setName(client.name);
            setPassword(client.password);
        }
        console.log(client)
        console.log(name)
        console.log(password)
    }, [])	
    
    const handleClick = (e) => {
        if(e.target.classList){
            if (e.target.classList.contains('backdrop')) {
                toggleModal();
            }
        }
    }

    const _checkInput = () => {
        if(name && password && user){
            return true;
        }
        else if(!name){
            alert('Enter the client name');
        }
        else if(!password){
            alert('Enter the client password');
        }
    }


    const save = () => {
       if(_checkInput()){
            if(client.name && client.password){
                console.log('update')
                update();
            }
            else{
                add();
            }
       } 

    }

    const add = () => {
        //alert(user.uid)
       addClient(user.uid, name, password)
       .then(response => {
           console.log('client saved');
           console.log(response);
           toggleModal();
           getClients();
       })
       .catch(error => {
           console.log('client saved failed')
           console.log(error);
       })
    }

    const update = () => {
        updateClient(client.id, name, password)
        .then(response => {
            console.log('client updated');
            console.log(response);
        })
        .catch(error => {
            console.log('client updated failed')
            console.log(error);
        })

        }



  return (
    <motion.div onClick={handleClick} className="backdrop" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            >
                <motion.div  
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    className="modalcontainer"
                >
            
                    <div className="imagecontainer">
                            <div className="output">
                                <input value={name} placeholder='Client name'
                                    onChange={
                                        e => setName(e.target.value)}
                                />
                                <input value={password} type='text' placeholder='Client password'
                                    onChange={
                                        e => setPassword(e.target.value)}
                                />
                                <button onClick={save}>{(client.name && client.password)?'update':'add'}</button>
                            </div>
                    </div>
                </motion.div>
            </motion.div>
  )
}

export default ClientModal;