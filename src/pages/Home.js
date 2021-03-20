import { extname } from 'path';
import React, {useState} from 'react';
import { useStateValue } from '../redux/StateProvider'
import { getPictures } from '../api/functions'
import { useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import {motion} from 'framer-motion';
import '../styles/Home.css';

function Home() {
  const [pictures, setPictures] = useState([]);
  const [{user}, dispatch] = useStateValue();
  const history = useHistory();
	useEffect(() => {
    _checkAuth();
    if(user){
      _getPictures(user.uid)
      
    }

  }, [user])	
  

  const _checkAuth = () => {
      if(!user){
        history.push('/auth');
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
    <div className="App">
      <div className="img-grid">
        {pictures && pictures.map(picture => (
          <motion.div className="img-wrap" key={picture.id} 
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => {}}
          >
            <motion.img src={picture.url} alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
export default Home;