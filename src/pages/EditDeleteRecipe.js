import React, {useState, useEffect} from 'react'
import Axios from 'axios';

function EditDeleteRecipe({props}) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);  // Das gerade ausgewählte Rezept
  const [editRecipe, setEditRecipe] = useState(false); // Klappt das Formular aus
  const [fetchedRecipe, setFetchedRecipe] = useState({}); // Die gefetchten Daten zum ausgewählten Rezept, wie sie aus der DB kommen
  const [recipeToEdit, setRecipeToEdit] = useState({}); // Das Onjekt mit den Änderunge -> wird an die DB gesendet

  // Wählt das Rezept aus dem Dropdown-Menü aus
  const handleSelect = (e) => {
    setSelectedRecipe(e.target[e.target.selectedIndex].id)
  }
  
  // Daten aus der DB holen und Formular aufklappen
  const editHandler = () => {
    fetch(`http://localhost:8000/recipes/${selectedRecipe}`)
      .then(res => res.json())
      .then(data => setFetchedRecipe(data))
      .catch(err => console.log(err))

    editRecipe === false ? setEditRecipe(true) : setEditRecipe(false); // Toggle't das Edit-Formular
  }

  // Formulardaten übernehmen und in den State "fetchedRecipe" schmeißen
  const editSubmitHandler = (e) => {
    e.preventDefault();

    // Erstellt das Objekt mit den Änderungen
    setRecipeToEdit({
      id: selectedRecipe,
      name: e.target[0].value, 
      ingredients: e.target[1].value,
      steps: e.target[3].value,
      difficult: e.target[4].value,
      cookingtime: e.target[5].value,
      calories: e.target[6].value
    })
  }

  // Wird nur ausgeführt, wenn sich "recipeToEdit" verändert
  useEffect(() => {
    const reqOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(recipeToEdit)
    };
    fetch(`http://localhost:8000/edit/${selectedRecipe}`, reqOptions)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [recipeToEdit])
  
  // Wird bei Klick auf delete-Button ausgeführt
  const deleteHandler = () => {
    fetch(`http://localhost:8000/delete/${selectedRecipe}`, {method: 'delete'})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="detail-wrapper">
        <div className="recipe-detail-container">
          <select type="select" onChange={handleSelect}>
            {props && props.map(item => 
              <option id={item.id} key={item.id}>{item.name}</option>
            )}
          </select>
          <button onClick={editHandler}>Edit Recipe</button>
          <button onClick={deleteHandler}>Delete Recipe</button>
          {editRecipe && (
            <>
              <br/><br/>
              <h2 style={{marginLeft: 2 + 'rem'}}>Edit the recipe</h2>
              {fetchedRecipe[0] && (
              <form className="container-ml2" onSubmit={editSubmitHandler} >
                <label >Recipe name</label> <br/>
                <input style={{width: 20 + 'rem'}} name="recipe-name" type="text" maxLength="128" defaultValue={fetchedRecipe[0].name} /><br/><br/>

                <label >Ingredients</label> <br/>
                <textarea style={{width: 40 + 'rem', height: 6 + 'rem'}} name="recipe-ingredients" defaultValue={fetchedRecipe[0].ingredients} ></textarea><br/><br/>

                <label >Image</label><br/>
                <input type="file" name="recipe-file" /><br/><br/>

                <label >Cooking Steps</label> <br/>
                <textarea style={{width: 40 + 'rem', height: 6 + 'rem'}} name="recipe-steps" defaultValue={fetchedRecipe[0].steps} ></textarea><br/><br/>

                <label >Difficult</label> <br/>
                <input style={{width: 20 + 'rem'}} name="recipe-difficult" type="text" defaultValue={fetchedRecipe[0].difficult} /><br/><br/>

                <label >Cooking time</label> <br/>
                <input style={{width: 20 + 'rem'}} name="recipe-time" type="text" defaultValue={fetchedRecipe[0].cookingtime} /><br/><br/>

                <label >Calories</label> <br/>
                <input style={{width: 20 + 'rem'}} name="recipe-kcal" type="text" defaultValue={fetchedRecipe[0].calories} /><br/><br/>

                <input type="submit"></input>

              </form>
              )}
            </>
          )}
       </div>
      </div>
    </>
  )
}

export default EditDeleteRecipe
