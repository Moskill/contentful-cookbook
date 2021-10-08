import React from 'react'
import {useParams} from 'react-router-dom';


function Recipe({props}) {
  let {recipe} = useParams();
  console.log(props, 'Recipe.js');

  const wantedRecipe = props.filter(item => {
    return item.fields.name === recipe;
  })

  console.log(wantedRecipe);

  return (
    <>
      <div className="detail-wrapper">
        <div className="recipe-detail-container">
          <div className="recipe-detail-header"><h1><span className="deko-line"></span> {wantedRecipe[0].fields.name} <span className="deko-line"></span></h1></div>
          <div className="recipe-detail-body">
            <div className="recipe-detail-image">
              <img src={'https:' + wantedRecipe[0].fields.image.fields.file.url.substr(2)}/>
            </div>
            <div className="recipe-detail-ingredients"></div>
            <div className="recipe-detail-steps"></div>
          </div>
          <div className="recipe-detail-footer"></div>
        </div>
      </div>
      {/* <p>Hello {recipe}</p> */}
    </>
  )
}

export default Recipe
