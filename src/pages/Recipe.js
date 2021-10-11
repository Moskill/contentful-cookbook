import React from 'react'
import {useParams} from 'react-router-dom';
import Footer from './Footer';
import '../App.css';


function Recipe({props}) {
  let {recipe} = useParams();
  console.log(props, 'Recipe.js');

  const wantedRecipe = props.filter(item => {
    return item.fields.name === recipe;
  })

  console.log(wantedRecipe, 'bla');

  return (
    <>
      <div className="detail-wrapper">
        <div className="recipe-detail-container">
          <div className="recipe-detail-header"><h1><span className="deko-line"></span> {wantedRecipe[0].fields.name} <span className="deko-line"></span></h1></div>
          <div className="recipe-detail-body">
            <div className="recipe-detail-image">
              <img src={'https:' + wantedRecipe[0].fields.image.fields.file.url.substr(2)}/>
            </div>
            <div className="recipe-detail-info">
              <p><label className="recipe-info-label">Calories</label>{wantedRecipe[0].fields.calories}</p>
              <p><label className="recipe-info-label">Cooking time</label>{wantedRecipe[0].fields.cookingTime}</p>
              <p><label className="recipe-info-label">Difficult</label>{wantedRecipe[0].fields.difficult}</p>
            </div>
            <div className="recipe-inner-body">
              <div className="recipe-detail-ingredients">
                {wantedRecipe[0].fields.ingrediens}
              </div>
              <div className="recipe-detail-steps">
              {wantedRecipe[0].fields.steps}
              </div>
            </div>
          </div>
        </div>
          <Footer/>
      </div>
      {/* <p>Hello {recipe}</p> */}
    </>
  )
}

export default Recipe
