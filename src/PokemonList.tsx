import { Pokemon } from './types';

type PokemonListProps = {
  pokemonResults: Pokemon[]
};

function PokemonList({ pokemonResults }: PokemonListProps) {
  const pokemonEls = pokemonResults.map(pokemon => {
    return (
      <article key={pokemon.id}>
        <h2>{pokemon.name}</h2>
        <p>{pokemon.classfication}</p>
      </article>
    )
  });  
  
  return (
    <section>
      {pokemonEls}
    </section>
  );
}

export default PokemonList;