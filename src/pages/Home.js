import React from 'react'
import {useHistory} from 'react-router-dom';

function Home(props) {

  let history = useHistory();

  return (
    <>
      <div className="main">Welcome to our amazing cookbook!
        <button onClick={() => {history.push('./spaghetti')}}>Yummy Spaghetti</button>
      </div>
    </>
  )
}

export default Home
