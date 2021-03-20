import React, { useState } from 'react'
import '../styles/Auth.css'
import logo from '../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom'

import { useStateValue } from '../redux/StateProvider'
import {auth, firestore} from '../firebase/config'

function Auth() {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e:any) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth:any) =>{
                history.push('/')
            })
            .catch((error:any) => alert(error.message))
    }

    const register = (e:any) => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth:any) => {
                // successfully created a new user with email and password
                console.log(auth);
                if(auth){
                    history.push('/')
                }
            })
            .catch( (error:any) => alert(error.message))
    }


    return (
        <div className="login">
            <Link to="/">
                <img src={logo} className="login__logo"/>
            </Link>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={
                            e => setEmail(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input 
                        type="password" 
                        value={password}
                        onChange={
                            e => setPassword(e.target.value)
                        }
                        
                        />

                    <button 
                        type="submit"
                        className="login__signInButton"
                        onClick={signIn}
                        >Sign in</button>
                </form>
                
                <p>
                    By signing-in you agree to Amazon fake clone
                    Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice
                    and our Interest-Based Ads Notice.
                </p>
                <button 
                    onClick={register}
                    className="login__registerButton"
                    >Create your Pictas Account</button>
            </div>
        </div>
    )

}

export default Auth;
