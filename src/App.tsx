import React from 'react';
import Auth from './pages/Auth';
import Home from './pages/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { useStateValue } from './redux/StateProvider'
import { useEffect } from 'react';
import {auth} from './firebase/config'
import Header from './pages/Header'

function App() {
	const [{user}, dispatch] = useStateValue()

	useEffect(() => {
		auth.onAuthStateChanged(authUser =>{
			
			if(authUser){
				//the user just logged in / the user was logged in 
				dispatch({
					type: 'SET_USER',
					user: authUser
				})
			}
			else{
				// the user is logged out
				dispatch({
					type: 'SET_USER',
					user: null
				})
			}
		})
	}, [])	

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/auth">
            <Auth/>
          </Route>
          <Route path="/">
			<Header/>
            <Home/>
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
