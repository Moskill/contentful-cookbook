import React from 'react';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import placeholder from '../images/placeholder.jpg';

function Recipes({props}) {
  console.log(props);
  return (
    <>
      <div className="recipe-container">
        {props.map((item) => {
          return <>   
            <div className="recipe-wrapper">
              <div className="recipe-image">
                <img src={placeholder}/>
              </div>
              <div className="recipe-title">
                <div className="title-overlay">{item.fields.name.enUS}
                <Link to={`/recipe/${item.fields.name.enUS}`}>
                  <button className="view-recipe">View</button>
                </Link>
                </div>
              </div>
            </div>
          </>
        })}
      </div>

    </>
  )
}

export default Recipes;
