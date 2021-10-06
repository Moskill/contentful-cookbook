import React from 'react'

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
            <button className="view-recipe">View</button></div>
          </div>
        </div>
      </>
    })}
      </div>


    </>
  )
}

export default Recipes;
