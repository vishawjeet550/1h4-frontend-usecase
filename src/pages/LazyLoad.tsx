import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getPokemonList } from '../api/pokemonApi';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';

const LazyLoad: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPokemonList = async (pageNumber: number) => {
    try {
      const { data }: any = await getPokemonList('', pageNumber, 100);
      setPokemonList(prevList => [...prevList, ...data]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    }
  };

  useEffect(() => {
    fetchPokemonList(page);
  }, [page]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const infiniteScrollRef = useInfiniteScroll(handleLoadMore);

  return (
    <div>
      <h1 className="text-4xl font-bold my-4">Lazy Load Page</h1>
      <SearchBar onSearch={handleSearch} />
      <PokemonList pokemonList={pokemonList} loading={loading} />
      <div ref={infiniteScrollRef} className="mt-4">
        {loading && <p>Loading more...</p>}
      </div>
      <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Go back to Home
      </Link>
    </div>
  );
};

export default LazyLoad;
