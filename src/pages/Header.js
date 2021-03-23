import React, {useState } from 'react'
import '../styles/Header.css'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import SearchIcon from '@material-ui/icons/Search'
import im from '../assets/logo.svg'
import {Link} from 'react-router-dom'
import { useStateValue } from '../redux/StateProvider'
import {auth} from '../firebase/config'
import AddPictureModal from '../components/AddPictureModal'
import { getClients } from '../api/functions'
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';

function Header() {
    const queryString = require('query-string');
    const [clients, setClients] = useState([]);
    const [{basket, user}, dispatch] = useStateValue()
    const [addPictureModalIsShow, toggleAddPictureModalIsShow] = useState(false);
    const location = useLocation();
    const queries = queryString.parse(location.search)

	useEffect(() => {
        console.log(location)
        _getClients();
    }, [user])	
    

    const handleAuthentification  = () => {
        if(user){
            auth.signOut();
        }
    }

    const addPicture = () => {
        toggleAddPictureModalIsShow(true);
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
        <div className='header'>
            { (user)?
         	    (<Link to="/">
                <h1>Pictas</h1> 
                </Link>)
                :
         	    (<h1>Pictas</h1>)
            }
            <div className="header__search">
            </div>
            <div className='header__nav'>
                { !(queries.clientId && queries.userId ) &&
                <Link to={!user && '/auth/'}>
                    <div onClick={handleAuthentification} className="header__option">
                        <span className='header__optionLineOne'>Hello {!user?'Guest': user.email}</span>
                        <span className='header__optionLineTwo'>{user? 'Sign Out': 'Sign In'}</span>
                    </div>
                </Link>
                }   
                { user &&
            	<Link to="/clients">
                    <div  className="header__option">
                        <span className='header__optionLineOne'>gerer les</span>
                        <span className='header__optionLineTwo'>Clients</span>
                    </div>
                </Link>
                }
                <div className="header__option">
                    { user &&
                    <button onClick={addPicture}>
                        <AddAPhotoIcon/>
                    </button>
                    }
                </div>
                
            </div>
            { addPictureModalIsShow &&(
                <AddPictureModal user={user} clients={clients} toggleModal={toggleAddPictureModalIsShow} modalIsShow={addPictureModalIsShow}/>
            )}
        </div>
    )
}

export default Header
