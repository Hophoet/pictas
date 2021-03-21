
import React, {useState } from 'react'
import '../styles/Header.css'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import {Link} from 'react-router-dom'
import { useStateValue } from '../redux/StateProvider'
import {auth} from '../firebase/config'
import { getClients } from '../api/functions'
import { useEffect } from 'react';


function Client() {
    const [clients, setClients] = useState([]);
    const [{user}, dispatch] = useStateValue()

	useEffect(() => {
    }, [user])	
    

    const handleauthentification  = () => {
        if(user){
            auth.signOut();
        }
    }
    
    const _getClients = () => {
        if(user){
            getClients(user.uid)
            .then(response =>{
                console.log(response);
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
        </div>
    )
}

export default Client
