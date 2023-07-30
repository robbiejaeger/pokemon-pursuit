import React, { useEffect, useState } from 'react';
import './App.css';
import { Pokemon } from './types';
import PokemonList from './PokemonList';

function formatSearchURL(query: string, nextPageToken: string | null): string {
  if (nextPageToken) {
    return `https://hungry-woolly-leech.glitch.me/api/pokemon/search/${query}?page=${nextPageToken}`
  }
  return `https://hungry-woolly-leech.glitch.me/api/pokemon/search/${query}`
}

function App() {
  const [pokemonResults, setPokemonResults] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextToken, setNextToken] = useState("");

  function handleSearchChange(e: React.FormEvent<HTMLInputElement>): void {
    console.log("input change")
    const currentQuery = e.currentTarget.value;
    setPokemonResults([]);
    setSearchTerm(currentQuery);
    if (currentQuery) {
      getPokemonResultFromAPI(currentQuery, null);
    }
  }

  useEffect(() => {
    if (nextToken) {
      console.log("use effect", searchTerm, nextToken)
      getPokemonResultFromAPI(searchTerm, nextToken);
    }
  }, [searchTerm, nextToken])

  async function getPokemonResultFromAPI(query: string, nextPageToken: string | null) {
    console.log(query, nextPageToken)
    const URL = formatSearchURL(query, nextPageToken);
    
    try {
      const response = await fetch(URL);
      if (response.ok) {
        var results = await response.json();
      } else {
        throw Error("Something happened when searching for pokemon.");
      }

      const newNextPage = results.nextPage;
      if (newNextPage) {
        setNextToken(newNextPage);
        setPokemonResults(prevResults => [...prevResults, ...results.pokemon]);
      } else {
        setNextToken("");
        setPokemonResults(prevResults => [...prevResults, ...results.pokemon]);
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <h1>Pokemon Pursuit</h1>

      <input 
        value={searchTerm} 
        onChange={handleSearchChange} 
        type="text"
      />

      <PokemonList pokemonResults={pokemonResults}/>
    </div>
  );
}

export default App;
