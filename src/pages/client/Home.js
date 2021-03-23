
import React, {useState} from 'react';
import { useStateValue } from '../../redux/StateProvider'
import { getClientPictures, getClient } from '../../api/functions'
import { useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import {motion} from 'framer-motion';
import '../../styles/Home.css';
import PictureModal from '../../components/PictureModal';
import {useLocation} from 'react-router-dom';


function Home() {
  const queryString = require('query-string');
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [client, setClient] = useState({});
  const [{user}, dispatch] = useStateValue();
  const location = useLocation();
  const queries = queryString.parse(location.search)

  const history = useHistory();
	useEffect(() => {
        _getPictures();
        _getClient();
  }, [user])	
  


  const _getPictures = () => {
    if(queries.userId && queries.clientId){
      getClientPictures(queries.userId, queries.clientId)
      .then(response => {
        setPictures(response)
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  const _getClient = () => {
    if(queries.userId && queries.clientId){
        getClient(queries.clientId)
        .then(response => {
            setClient(response);
        })
      .catch(error => {
        console.log(error);
      })

    }
  }
  
  return (
    <div className="home-container">
	    <h1>{client && client.name}</h1>
      <div className="img-grid">
        {pictures && pictures.map(picture => (
          <motion.div className="img-wrap" key={picture.id} 
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => { setSelectedPicture(picture)}}
          >
            <motion.img src={picture.url} alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
      </div>
      { selectedPicture && (
        <PictureModal selectedPicture={selectedPicture} setSelectedPicture={setSelectedPicture} />
      )}
    </div>
  );
} 
export default Home;