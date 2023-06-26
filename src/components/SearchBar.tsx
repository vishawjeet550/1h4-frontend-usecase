import React, { ChangeEvent } from 'react';
import useDebounce from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search Pokemon"
      className="border border-gray-300 rounded px-4 py-2 my-4 w-64"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
