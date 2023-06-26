export const getPokemonList = async (searchTerm: string, page: number, limit: number): Promise<Object> => {
    const offset = (page - 1) * limit;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}&q=${searchTerm}`);
    const data = await response.json();
    return { data: data.results.map((pokemon: any) => pokemon.name), count: data.count }
  };
  