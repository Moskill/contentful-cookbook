import React from 'react';
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
                <img src={item && item.image} alt={item.name}/>
              </div>
              <div className="recipe-title">
                <div className="title-overlay">{item.name}
                <Link to={`/recipe/${item.id}`}>
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
