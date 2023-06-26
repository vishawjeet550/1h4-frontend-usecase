import React from 'react';

interface PokemonListProps {
  pokemonList: string[];
  loading: boolean;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList, loading }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <ul className="grid grid-cols-3 gap-4">
      {pokemonList.map((pokemon: any) => (
        <li key={pokemon.url} className="border border-gray-300 rounded px-4 py-2">
          {pokemon}
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
