import React, {useState, useEffect} from 'react';
import {client} from './client';
import {Route, Switch, NavLink} from 'react-router-dom';
import Recipes from './pages/Recipes';
import './App.css';

function App() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    client.getEntries()
      .then(res => setRecipes(res.items))
      .catch(err => console.log(err))
  },[])

  
  return (
    <div>
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/recipes" >All Recipes</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/recipes" component={Recipes}>
          <Recipes props={recipes}/>
        </Route>
        <Route path="/about"></Route>
        <Route path="/"></Route>
      </Switch>
    </div>
  );
}

export default App;
