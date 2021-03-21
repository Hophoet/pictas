
import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import '../styles/ClientModal.css';
import { addClient } from '../api/functions';

const ClientModal = ({toggleModal, setSelectedPicture, selectedPicture, user }) => {
    const [client, setClient] = useState([]);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

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
            add();
       } 

    }

    const add = () => {
        //alert(user.uid)
       addClient(user.uid, name, password) 
       .then(response => {
           console.log('client saved')
           console.log(response)
       })
       .catch(error => {
           console.log('client saved failed')
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
                                <input placeholder='Client name'
                                    onChange={
                                        e => setName(e.target.value)}
                                />
                                <input type='text' placeholder='Client password'
                                    onChange={
                                        e => setPassword(e.target.value)}
                                />
                                <button onClick={save}>ajouter</button>
                            </div>
                    </div>
                </motion.div>
            </motion.div>
  )
}

export default ClientModal;