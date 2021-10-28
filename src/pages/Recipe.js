import React from 'react'
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import '../App.css';


function Recipe({props}) {
  console.log(props)
  let {recipe} = useParams();

  const wantedRecipe = props.find(item => item.id == recipe);

  return (
    <>
    {wantedRecipe && (
      <div className="detail-wrapper">
        <div className="recipe-detail-container">
          <div className="recipe-detail-header"><h1><span className="deko-line"></span> {wantedRecipe.name} <span className="deko-line"></span></h1></div>
          <div className="recipe-detail-body">
            <div className="recipe-detail-image">
              <img src={wantedRecipe.image} alt={wantedRecipe.name}/>
              <Link to={`/editrecipe/${wantedRecipe.id}`}>
                <div className="edit-btn">Edit recipe</div>
              </Link>
            </div>
            <div className="recipe-detail-info">
              <p><label className="recipe-info-label">Calories</label>{wantedRecipe.calories}</p>
              <p><label className="recipe-info-label">Cooking time</label>{wantedRecipe.cookingtime}</p>
              <p><label className="recipe-info-label">Difficult</label>{wantedRecipe.difficult}</p>
            </div>
            <div className="recipe-inner-body">
              <div className="recipe-detail-ingredients">
                {wantedRecipe.ingredients}
              </div>
              <div className="recipe-detail-steps">
              {wantedRecipe.steps}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default Recipe
