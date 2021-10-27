import React, { useState, useEffect } from 'react';
import '../App.css';

function AddRecipe({edit}) {

  if(edit) {
    console.log('Hier geht was ab!')
  }

  const [addedRecipe, setAddedRecipe] = useState({
    name: '', 
    ingredients: '', 
    image: '', 
    steps: '',
    difficult: '', 
    cookingtime: '', 
    calories: ''
  });

  const addRecipeHandler = (e) => {
    e.preventDefault();

    setAddedRecipe({
      name: e.target[0].value, 
      ingredients: e.target[1].value,
      image: e.target[2].files[0].name,
      steps: e.target[3].value,
      difficult: e.target[4].value,
      cookingtime: e.target[5].value,
      calories: e.target[6].value
    });
  }

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

  useEffect(() => {
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'image/jpeg'},
      body: JSON.stringify(addedRecipe.image)
    };
    fetch('http://localhost:8000/upload', reqOptions)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [addedRecipe])

  return (
    <>
      <div className="detail-wrapper">
        <div className="recipe-detail-container ">
          <h1>Add a recipe</h1>
          <form className="container-ml2" onSubmit={addRecipeHandler} >
            <label for="recipe-name" id="name">Recipe name</label> <br/>
            <input style={{width: 20 + 'rem'}} name="recipe-name" type="text" maxLength="128"/><br/><br/>

            <label for="recipe-ingredients">Ingredients</label> <br/>
            <textarea style={{width: 40 + 'rem', height: 6 + 'rem'}} name="recipe-ingredients" placeholder="Put the ingredients here..."></textarea><br/><br/>

            <label for="recipe-file">Image</label><br/>
            <input type="file" name="recipe-file" /><br/><br/>

            <label for="recipe-steps">Cooking Steps</label> <br/>
            <textarea style={{width: 40 + 'rem', height: 6 + 'rem'}} name="recipe-steps" placeholder="Put the cooking steps here..."></textarea><br/><br/>

            <label for="recipe-difficult">Difficult</label> <br/>
            <input style={{width: 20 + 'rem'}} name="recipe-difficult" type="text" /><br/><br/>

            <label for="recipe-time">Cooking time</label> <br/>
            <input style={{width: 20 + 'rem'}} name="recipe-time" type="text" /><br/><br/>

            <label for="recipe-kcal">Calories</label> <br/>
            <input style={{width: 20 + 'rem'}} name="recipe-kcal" type="text" /><br/><br/>

            <input type="submit"></input>

          </form>
        </div>
      </div>
    </>
  )
}

export default AddRecipe
