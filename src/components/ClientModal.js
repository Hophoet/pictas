
import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import '../styles/ClientModal.css';
import { addClient, updateClient, clientPasswordExists, clientUsernameExists } from '../api/functions';

import {
  CContainer,
  CRow,
  CForm,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CFormText,
  CButton
} from '@coreui/react'


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
           clientUsernameExists(name)
           .then(nameExists => {
               if(nameExists && !client.name){
                   alert('client name already exists')
               }
               else if(nameExists && client.name != name){
                   alert('client name already exists')
               }
               else{
                    clientPasswordExists(password)
                        .then(exists => {
                            if(exists && !client.password){
                                alert('client password already exists')
                            }
                            else if(exists && client.password != password){
                                alert('client password already exists')
                            }
                            else{
                                if(client.name && client.password){
                                    console.log('update')
                                    update();
                                }
                                else{
                                    add();
                                }
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
               }
           })
            .catch(error => {
                console.log(error);
            })
        
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
            toggleModal();
            getClients();
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
            
                    <CContainer>
                        <CRow>
                            <CCol sm="12">
                            <CForm action="" method="post">
                                <CFormGroup>
                                <CLabel htmlFor="nf-name">Name</CLabel>
                                <CInput
                                    value={name}
                                    type="text"
                                    id="nf-name"
                                    placeholder="Enter Name.."
                                    onChange={
                                        e => setName(e.target.value)}
                                />
                                <CFormText className="help-block">Please enter the client your name</CFormText>
                                </CFormGroup>
                                <CFormGroup>
                                <CLabel htmlFor="nf-password">Password</CLabel>
                                <CInput
                                    value={password}
                                    type="text"
                                    id="nf-password"
                                    name="nf-password"
                                    placeholder="Enter Password.."
                                    autoComplete="current-password"
                                    onChange={
                                        e => setPassword(e.target.value)}
                                />
                                <CFormText className="help-block">Please enter the client password</CFormText>
                                </CFormGroup>
                                <CButton onClick={save} color="primary" className="">{(client.name && client.password)?'update':'add'}</CButton>
                            </CForm>
                            </CCol>
                        </CRow>
                    </CContainer>
                </motion.div>
            </motion.div>
  )
}

export default ClientModal;