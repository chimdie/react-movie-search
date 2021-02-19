import React, {useState} from 'react';
import MovieCard from './MovieCard'

export default function SearchMovies(){
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  
  function queryFunc(e){
    setQuery(e.target.value)
  }

  const searchMovies = async (e) => {
    e.preventDefault()
  
    const url = `https://api.themoviedb.org/3/search/movie?api_key=303d095333ccda0a004f3c3e59288e27&language=en-US&query=${query}&page=1&include_adult=false`;

    try{
      const res = await fetch(url)
      const data = await res.json()
      // display movies after getting data ready
      setMovies(data.results)
      setQuery('')
    }catch(err){
      console.log(err)
    }
  }  
  return(
    <>
      <form className='form' onSubmit={searchMovies} >
        <label htmlFor='query'></label>
        <input 
          className='input'
          type='text'
          name='query'
          value={query}
          onChange={queryFunc}
        />
        <button>Search</button>
      </form>
        <div className='card--list'>
          {movies.filter(movie => movie.poster_path).map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
    </>
  )
}