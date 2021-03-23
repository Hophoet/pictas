import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import '../styles/PictureModal.css';
import { getPictureClient } from '../api/functions'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import { useStateValue } from '../redux/StateProvider'


const PictureModal = ({ setSelectedPicture, selectedPicture }) => {
    const [{user}, dispatch] = useStateValue()
    const [client, setClient] = useState([]);

    useEffect(() => {
        _getClient();
    }, [])	
    
    const handleClick = (e) => {
        if(e.target.classList){
            if (e.target.classList.contains('backdrop')) {
            setSelectedPicture(null);
            }
        }
    }

    const _getClient = () => {
        getPictureClient(selectedPicture.clientId)
        .then(client => {
            setClient(client);
            console.log(client)
        })
        .catch(error =>{
            console.log(error);
        })
    }



  return (
    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
        <motion.img src={selectedPicture.url} alt="enlarged pic" 
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
        />
        { user &&
        <div className='picture-modal-footer'
        >
            { client &&
            <div>
                <p>name: {client.name}</p>
                <p>password: {client.password}</p>
            </div>
            }
            <a 
                href={selectedPicture.url+"?force=true"} 
                >
                <DownloadIcon/>
            </a>
            <button
            >delete</button>
        </div>
        }
    
    </motion.div>
  )
}

export default PictureModal;