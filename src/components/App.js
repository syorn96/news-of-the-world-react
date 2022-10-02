import '../App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

import Display from './pages/Display';
import Landing from './pages/Landing';

function App() {

  //Set articles to be an empty array then useEffect to set articles to the array from API results
  const [ articles, setArticles ] = useState([])
  const [ current, setCurrent ] = useState({})

  useEffect(()=> {
    const API_KEY = process.env.REACT_APP_NEWS_API_KEY
    // console.log(API_KEY)
    const popularArticlesUrl = `https://newsapi.org/v2/everything?q=Apple&from=2022-10-01&sortBy=popularity&apiKey=${API_KEY}`;
    async function fetchNewsAPI(){
      try{
        console.log('useEffect is firing!');
        const response = await fetch(popularArticlesUrl)
        const responseData = await response.json()
        // console.log(responseData.articles)
        setArticles(responseData.articles)
        console.log(articles)

      }catch(err){
        console.log(err)
      }
    }
    fetchNewsAPI(); // invoke function
  }, [])

  return (
    <div className="App">
      <nav>
        <Link to='/'>Homepage</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Landing articles={articles}/>} />
          <Route path="/display" element={<Display />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
