
import React, {useState } from 'react'
import '../styles/Clients.css';

import PersonAdd from '@material-ui/icons/PersonAdd'
import {Link} from 'react-router-dom'
import { useStateValue } from '../redux/StateProvider'
import {auth} from '../firebase/config'
import { getClients } from '../api/functions'
import { useEffect } from 'react';
import ClientModal from '../components/ClientModal';


function Client() {
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState([]);
    const [modalIsShow, toggleModal] = useState(false)
    const [{user}, dispatch] = useStateValue()

	useEffect(() => {
        _getClients();
    }, [user])	
    

    const handleauthentification  = () => {
        if(user){
            auth.signOut();
        }
    }

    const _toggleModal = () => {
        toggleModal(!modalIsShow);
    }
    
    const _getClients = () => {
        if(user){
            getClients(user.uid)
            .then(response =>{
                setClients(response);
            })
            .catch(error => {
                console.log(error);
            })
         }
    }

    return (
        <div className='container'>
            <h1>clients</h1>
            <button onClick={_toggleModal}>
                <PersonAdd/> 
            </button>
            {clients && clients.map(client => (
                <div>
                    <h4>{client.name}</h4>
                    <p>{client.password}</p>
                </div>
            ))
            }
      { modalIsShow && (
        <ClientModal user={user} toggleModal={_toggleModal} client={client} setClient={setClient} />
      )}

        </div>
    )
}

export default Client
