import React from 'react';
import Footer from './Footer';
import {Link} from 'react-router-dom';

function Recipes({props}) {
  console.log(props);
  return (
    <>
      <div className="recipe-container">
    {props.map((item) => {
      return <>
        <div className="recipe-wrapper">
          <div className="recipe-image">
            <img src={'https:' + item.fields.image.fields.file.url.substr(2)}/>
          </div>
          <div className="recipe-title">
            <div className="title-overlay">{item.fields.name}
            <Link to={`/recipe/${item.fields.name}`}>
              <button className="view-recipe">View</button>
            </Link>
            </div>
          </div>
        </div>
      </>
    })}
      </div>
    <Footer/>


    </>
  )
}

export default Recipes;
