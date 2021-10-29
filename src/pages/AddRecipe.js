import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function AddRecipe(props) {

  const [addedRecipe, setAddedRecipe] = useState({
    id: '',
    name: '', 
    ingredients: '', 
    image: '',
    steps: '',
    difficult: '', 
    cookingtime: '', 
    calories: ''
  });


  // Handle add recipe click
  const addRecipeHandler = (e) => {
    e.preventDefault();
    console.log(e.target[2].files[0].name)
    setAddedRecipe({
      id: props.length + 1,
      name: e.target[0].value, 
      ingredients: e.target[1].value,
      image: e.target[2].files[0].name,
      steps: e.target[3].value,
      difficult: e.target[4].value,
      cookingtime: e.target[5].value,
      calories: e.target[6].value
    });
  }

  const addImageHandler = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file)
    
    axios.post('http://localhost:8000/upload', data)
      .then(console.log('Löbbt!'))
  }

  // Add recipe
  useEffect(() => {
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(addedRecipe)
    };
    fetch('http://localhost:8000/post', reqOptions)
      .then(res => res.json())
      .catch(err => console.log(err))
  }, [addedRecipe]);

  return (
    <>
  
      <div className="detail-wrapper">
        <div className="recipe-detail-container ">
          {<h1>Add recipe</h1>}
          <form className="container-ml2" onSubmit={addRecipeHandler} >
            <label >Recipe name</label> <br/>
            <input style={{width: 20 + 'rem'}} name="recipe-name" type="text" maxLength="128"  /><br/><br/>

            <label >Ingredients</label> <br/>
            <textarea style={{width: 40 + 'rem', height: 6 + 'rem'}} name="recipe-ingredients" ></textarea><br/><br/>

            <label >Image</label><br/>
            <input type="file" name="recipe-file" onChange={addImageHandler} /><br/><br/>

            <label >Cooking Steps</label> <br/>
            <textarea style={{width: 40 + 'rem', height: 6 + 'rem'}} name="recipe-steps" ></textarea><br/><br/>

            <label >Difficult</label> <br/>
            <input style={{width: 20 + 'rem'}} name="recipe-difficult" type="text" /><br/><br/>

            <label >Cooking time</label> <br/>
            <input style={{width: 20 + 'rem'}} name="recipe-time" type="text" /><br/><br/>

            <label >Calories</label> <br/>
            <input style={{width: 20 + 'rem'}} name="recipe-kcal" type="text" /><br/><br/>

            <input type="submit"></input>

          </form>
        </div>
      </div>
    </>
  )
}

export default AddRecipe
