import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { getPokemonList } from '../api/pokemonApi';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/common/Pagination';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pokemonList, setPokemonList] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const fetchPokemonList = async (pageNumber: number) => {
    try {
      setLoading(true);
      const list: any = await getPokemonList(debouncedSearchTerm, pageNumber, 20);
      setTotalPages(list.count)
      setPokemonList(list.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    }
  };

  useEffect(() => {
    fetchPokemonList(currentPage);
  }, [debouncedSearchTerm, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold my-4">Home Page</h1>
      <SearchBar onSearch={handleSearch} />
      <PokemonList pokemonList={pokemonList} loading={loading} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Link to="/lazy" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Go to Lazy Load Page
      </Link>
    </div>
  );
};

export default Home;
