
import React, {useState } from 'react'
import '../styles/Clients.css';

import PersonAdd from '@material-ui/icons/PersonAdd'
import {Link} from 'react-router-dom'
import { useStateValue } from '../redux/StateProvider'
import {auth} from '../firebase/config'
import { getClients, deleteClient } from '../api/functions'
import { useEffect } from 'react';
import ClientModal from '../components/ClientModal';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton
} from '@coreui/react'



const fields = ['name','url', 'update', 'delete'];

function Client() {
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState({});
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
        if(modalIsShow){
            setClient({});
        }
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

    const _deleteClient = (id) => {
        if(window.confirm('Do you want delete this client?')){
            deleteClient(id) 
            .then(response => {
                console.log('client deleted');
                _getClients();
            })
            .catch(error => {
                console.log('client delete failed');
                console.log(error);
            })
        }
    }

    const _updateClient = (client) => {
       setClient(client);
       _toggleModal(); 
    }

    return (

    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CButton  onClick={_toggleModal} color="success" className="">
                <PersonAdd/>     
              </CButton>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={clients}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'update':
                  (client)=>(
                    <td>
                        <CButton onClick={() => _updateClient(client)} color="primary" >update</CButton>
                    </td>
                  ),
                'delete':
                  (client)=>(
                    <td>
                        <CButton onClick={() => _deleteClient(client.id)} color="danger" >delete</CButton>
                    </td>
                  ),
                'url':
                  (client)=>(
                    <td>
                        <CButton onClick={() => _deleteClient(client.id)} color="info" >copier</CButton>
                    </td>
                  )

                
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      { modalIsShow && (
        <ClientModal getClients={_getClients} user={user} toggleModal={_toggleModal} client={client} setClient={setClient} />
      )} 
    </>
    )
}

export default Client
