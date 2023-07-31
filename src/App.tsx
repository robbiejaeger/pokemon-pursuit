import React, { useState } from 'react';
import './App.css';
import { Pokemon, AppState } from './types';
import { getPokemonResultFromAPI } from './helpers';
import PokemonList from './PokemonList';
import ShowAppState from './ShowAppState';

function App() {
  const [pokemonResults, setPokemonResults] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appState, setAppState] = useState<AppState>("UNREQUESTED");
  const [errorInfo, setErrorInfo] = useState("");

  async function handleSearchChange(e: React.FormEvent<HTMLInputElement>) {
    const currentQuery = e.currentTarget.value;
    setPokemonResults([]);
    setSearchTerm(currentQuery);
    if (currentQuery) {
      try {
        setAppState("LOADING");
        const { allResults, error } = await getPokemonResultFromAPI(currentQuery, null, { allResults: [], retries: 0, error: "" });
        setPokemonResults(allResults);
        if (error) throw Error(error);
        allResults.length ? setAppState("FETCHED_RESULTS") : setAppState("EMPTY_RESULTS");
      } catch(err: unknown) {
        if (err instanceof Error) {
          setAppState("ERROR");
          setErrorInfo(err.message);
        } else {
          console.error(err);
        }
      }
    } else {
      setAppState("UNREQUESTED");
    }
  }

  return (
    <div className="App">
      <h1>Pokemon Pursuit</h1>

      <label> 
        Search Pokemon Name:
        <input 
          value={searchTerm} 
          onChange={handleSearchChange} 
          type="text"
        />
      </label>

      <ShowAppState appState={appState} searchTerm={searchTerm} errorInfo={errorInfo}/>

      <PokemonList pokemonResults={pokemonResults} />
    </div>
  );
}

export default App;
