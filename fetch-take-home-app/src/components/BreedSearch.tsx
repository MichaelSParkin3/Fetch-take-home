import React, { useState } from 'react';

import { DOG_BREEDS } from '../utils/constants';

function BreedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchTerm(input);

    if (input) {
      const matches = DOG_BREEDS.filter(breed =>
        breed.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 6);
      setFilteredBreeds(matches);
    } else {
      setFilteredBreeds([]);
    }
  };

  return (
    <>
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          required
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </label>
      <form className="filter">
        <input className="btn btn-square" type="reset" value="×" onClick={() => setSearchTerm('')} />
        {filteredBreeds.map((breed, index) => (
          <input
            key={index}
            className="btn"
            type="radio"
            name="breeds"
            aria-label={breed}
          />
        ))}
      </form>
    </>
  );
}

export default BreedSearch;