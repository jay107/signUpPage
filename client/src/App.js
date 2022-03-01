import React, {useEffect, useState} from 'react'
import "./App.css";
import NavBar from "./components/layout/Navbar.js";
import Home from "./components/Home.js";
import Signup from "./components/Signup.js";
import Signin from "./components/Signin.js";
import { Route, Switch } from 'react-router';
const App = () => {
  
  return (
      <div className="App">
       <NavBar />
       <Switch>
         <Route path="/" exact>
            <Home />
         </Route>
         <Route path="/signin" exact>
           <Signin />
           </Route>
           <Route path="/signup" exact>
              <Signup />
           </Route>
       </Switch>
       </div> 
  )
}

export default App
