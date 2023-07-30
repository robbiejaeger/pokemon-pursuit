import React, { useState } from 'react';
import './App.css';
import { Pokemon } from './types';
import PokemonList from './PokemonList';

function formatSearchURL(query: string, nextPageToken: string | null): string {
  if (nextPageToken) {
    return `https://hungry-woolly-leech.glitch.me/api/pokemon/search/${query}?=${nextPageToken}`
  }
  return `https://hungry-woolly-leech.glitch.me/api/pokemon/search/${query}`
}

function App() {
  const [pokemonResults, setPokemonResults] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(e: React.FormEvent<HTMLInputElement>): void {
    const currentQuery = e.currentTarget.value;
    setSearchTerm(currentQuery);
    setPokemonResults([]);
    if (currentQuery) {
      getPokemonResultFromAPI(currentQuery, null);
    }
  }

  function getPokemonResultFromAPI(query: string, nextPageToken: string | null) {
    const URL = formatSearchURL(query, nextPageToken);
    
    fetch(URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error("Something happened when searching for pokemon.");
      })
      .then(results => {
        // if there is a next page token, request that page next, else ad results to state
        const newNextPage = results.nextPage;
        if (newNextPage) {
          setPokemonResults([...pokemonResults, ...results.pokemon]);
          // getPokemonResultFromAPI(query, newNextPage);
        } else {
          setPokemonResults([...pokemonResults, ...results.pokemon]);
        }
      })
      .catch(err => console.error(err));
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
