
import React, {useState} from 'react';
import { useStateValue } from '../../redux/StateProvider'
import { getPictures } from '../../api/functions'
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
  const [{user}, dispatch] = useStateValue();
  const location = useLocation();
  const queries = queryString.parse(location.search)

  const history = useHistory();
	useEffect(() => {
        _checkAuth();
    if(user){
      _getPictures(user.uid)
      
    }

  }, [user])	
  

  const _checkAuth = () => {
      if(!user){
        //history.push('/auth');
      }
  }

  const _getPictures = () => {
    let userId = user.uid;
    if(userId){
      getPictures(userId)
      .then(response => {
        setPictures(response)
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
  
  return (
    <div className="home-container">
	    <h1>Client dashboard</h1>
        <p>user id: {queries.user}</p>
        <p>client id: {queries.client} </p>
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