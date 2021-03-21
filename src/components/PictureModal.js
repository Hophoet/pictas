import React from 'react';
import { motion } from 'framer-motion';
import '../styles/PictureModal.css';

const PictureModal = ({ setSelectedPicture, selectedPicture }) => {

  const handleClick = (e) => {
    if(e.target.classList){
        if (e.target.classList.contains('backdrop')) {
        setSelectedPicture(null);
        }
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
        <div className='picture-modal-footer'
        >
            <p>name: {selectedPicture.name}</p>
            <p>password: {selectedPicture.password}</p>
        </div>
    
    </motion.div>
  )
}

export default PictureModal;