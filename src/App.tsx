import React, { useState } from 'react';
import './App.css';
import { Pokemon, AppState } from './types';
import PokemonList from './PokemonList';
import ShowAppState from './ShowAppState';

function formatSearchURL(query: string, nextPageToken: string | null): string {
  if (nextPageToken) {
    return `https://hungry-woolly-leech.glitch.me/api/pokemon/search/${query}?page=${nextPageToken}&chaos=true`;
  }
  return `https://hungry-woolly-leech.glitch.me/api/pokemon/search/${query}?chaos=true`;
}

function App() {
  const [pokemonResults, setPokemonResults] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appState, setAppState] = useState<AppState>("UNREQUESTED");

  async function handleSearchChange(e: React.FormEvent<HTMLInputElement>) {
    const currentQuery = e.currentTarget.value;
    setPokemonResults([]);
    setSearchTerm(currentQuery);
    if (currentQuery) {
      try {
        setAppState("LOADING");
        const allResults = await getPokemonResultFromAPI(currentQuery, null);
        setAppState("FETCHED_RESULTS");
        setPokemonResults(allResults);
      } catch(err) {
        console.error(err);
      }
    } else {
      setAppState("UNREQUESTED");
    }
  }

  async function getPokemonResultFromAPI(query: string, nextPageToken: string | null, allResults: Pokemon[] = []): Promise<Pokemon[]> {
    const URL = formatSearchURL(query, nextPageToken);
    
    try {
      const response = await fetch(URL);
      if (response.ok) {
        var results = await response.json();
        allResults.push(...results.pokemon)
      } else {
        // Retry under chaos mode
        return getPokemonResultFromAPI(query, nextPageToken, allResults);
      }

      const newNextPage = results.nextPage;
      if (newNextPage) {
        return getPokemonResultFromAPI(query, newNextPage, allResults);
      } else {
        return allResults;
      }
    } catch (err) {
      console.error(err)
      return allResults;
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

      <ShowAppState appState={appState} searchTerm={searchTerm} />

      <PokemonList pokemonResults={pokemonResults} />
    </div>
  );
}

export default App;
