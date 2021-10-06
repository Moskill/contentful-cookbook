import React from 'react'
import {useParams} from 'react-router-dom';


function Recipe(props) {
  let {recipe} = useParams();
  return (
    <>
      <p>Hello {recipe}</p>
    </>
  )
}

export default Recipe
