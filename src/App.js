import React, { useState, useEffect } from 'react';
import { FaBookDead } from 'react-icons/fa';
import { client } from './client';
import { Route, Switch, NavLink } from 'react-router-dom';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import Home from './pages/Home';
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
        <div className="logo-box">
          <FaBookDead className="logo-icon" />
          <span className="logo-text-1">Sau </span>
          <span className="logo-text-2">Lekker</span>
        </div>
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
        <Route exact path="/recipe/:recipe" component={Recipe}>
          <Recipe props={recipes}/>
        </Route>
        <Route path="/about"></Route>
        <Route exact path="/" component={Home}>
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
