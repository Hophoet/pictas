import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import '../styles/PictureModal.css';
import { getPictureClient, deleteImage, deletePicture } from '../api/functions'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import { useStateValue } from '../redux/StateProvider'


const PictureModal = ({ setSelectedPicture, selectedPicture, getPictures }) => {
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

    const _hideModal = () => {
        getPictures();
        setSelectedPicture(null);
    }


    const _delete = () => {
        const label = (client.name)?client.name:'this';
        if(window.confirm('Do you want to delete '+label+' picture ?')){
            deleteImage(selectedPicture.url)
            .then(response => {
                console.log('image deleted');
                console.log(response);
                deletePicture(selectedPicture.id)
                .then(response => {
                    _hideModal()
                })
                .catch(error => {
                    alert(error.code)
                })
            })
            .catch(error => {
                console.log('image delete failed');
                console.log(error);
                if( error.code == 'storage/object-not-found'){
                    deletePicture(selectedPicture.id)
                    .then(response => {
                        _hideModal()
                    })
                    .catch(error => {
                        alert(error.code)
                    })
                }
            })
        }
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
                onClick={_delete}
            >delete</button>
        </div>
        }
    
    </motion.div>
  )
}

export default PictureModal;