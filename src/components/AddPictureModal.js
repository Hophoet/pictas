import React from 'react';
import { motion } from 'framer-motion';
import AddAPhotoOutlined from '@material-ui/icons/AddAPhotoOutlined'
import '../styles/AddPictureModal.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { uploadImage } from '../api/functions';

export default class AddPictureModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pack:'',
            file:null,
            fileError:null,
            fileURL:'',
            clients:[],
            user:this.props.user
        }
        this.fileTypes = ['image/png', 'image/jpeg'];
    }

    setPack = (pack) =>{
        this.setState({pack:pack});
    }

    handlePackChange = (event) => {
        console.log(event.target.value)
        this.setPack(event.target.value);
    }

  handleClick = (e) => {
    if(e.target.classList){
        if (e.target.classList.contains('backdrop')) {
        this.props.toggleModal();
        }
    }
  }

  handleUploadFileChange = (e) => {
     let fileSelected = e.target.files[0];
     if(fileSelected && this.fileTypes.includes(fileSelected.type)){
         this.setState({
             fileURL:URL.createObjectURL(e.target.files[0])
         })
         
         
         this.setState({file:fileSelected});
         this.setState({fileError:''});
     } 
     else{
        this.setState({file:null})
        this.setState({error:'Please select an image file(png or jpg)'})
     }
  }

  savePicture = () => {
      //uploadImage()
      if(this.state.user){
        uploadImage(this.state.user.uid, this.state.file)
        .then(response => {
            console.log('update response', response);
        })
        .catch(error => {
            console.log(error);
        })
    }
  }



  componentDidMount() {
        let clients = this.props.clients;
        this.setState({clients:clients});
  }

    render(){
        return (
            <motion.div onClick={this.handleClick} className="backdrop" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            >
                <motion.div  
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    className="modalcontainer"
                >
            
                    <div className="imagecontainer">
                        {!this.state.file &&  
                            <form>
                                <label>
                                    <input className="fileuploadinput" type="file" onChange={this.handleUploadFileChange} />
                                    <AddAPhotoOutlined/>
                                </label>
                            </form>
                        }
                            <div className="output">
                                { this.state.fileError && <div className="error">{ this.state.error }</div>}
                                { this.state.file && 
                                   <img className='selectedImage' src={this.state.fileURL} />
                                 }
                            </div>
                    </div>
                    <FormControl className="clientselectform">
                        <InputLabel id="demo-simple-select-label">Client</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.pack}
                        onChange={this.handlePackChange}
                        >
                        {this.state.clients && this.state.clients.map(picture => (
                            <MenuItem name={picture.name} value={picture.id}>{picture.name}</MenuItem>
                        ))
                        }
                        </Select>
                    </FormControl>
                    { this.state.file && 
                        <Button onClick={this.savePicture} variant="contained">Ajouter</Button>
                     }
                </motion.div>
            </motion.div>
        )
    }
}