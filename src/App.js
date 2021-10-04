import React, {useState} from 'react';
import './App.css';
import {client} from './client';

function App() {

  const [articles, setArticles] = useState();

  client.getEntries()
    .then(res => console.log(res))
    .catch(err => console.log(err))

  return (
    <>
      <div className="container">
        <header>
          <div className="wrapper">
            <span>React and Contentful</span>
          </div>
        </header>
        <main>
          <div className="wrapper">
            
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
