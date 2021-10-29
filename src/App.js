import React, { useState, useEffect } from 'react';
import { FaBookDead } from 'react-icons/fa';
import { Route, Switch, NavLink } from 'react-router-dom';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './pages/Footer';
import AddRecipe from './pages/AddRecipe';
import EditDeleteRecipe from './pages/EditDeleteRecipe';
import './App.css';

function App() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
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
            <NavLink to="/addrecipe">Add Recipe</NavLink>
          </li>
          <li>
            <NavLink to="/editdelete">Edit Recipe</NavLink>
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

        <Route exact path="/about" component={About}>
          <About/>
        </Route>

        <Route exact path="/addrecipe" component={AddRecipe}>
          <AddRecipe length={recipes.length}/>
        </Route>

        <Route exact path="/editdelete" component={EditDeleteRecipe}>
          <EditDeleteRecipe props={recipes} />
        </Route>

        <Route exact path="/" >
          <Home />
        </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
