import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDogs } from '../redux/dogSlice';
import BreedSearch from './BreedSearch';
import LogoutButton from './LogoutButton';

function Search({ resetPage }) {
  const [filters, setFilters] = useState<Partial<Dog>>({});
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleBreedSelect = (selectedBreed: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      breed: selectedBreed
    }));
  };

  const applyFilters = () => {
    resetPage(); // Reset page counter
    const sort = `${sortField}:${sortOrder}`;
    dispatch(fetchDogs({ filters, sort }));
    console.log('applying filters with sort:', sort);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h2 className='text-2xl text-center font-bold mb-2'>Filter</h2>

        <li className="mb-7">
          <div className='flex'>
            <input
              type="number"
              name="ageMin"
              placeholder="Min Age"
              className="input input-bordered flex-2"
              onChange={handleInputChange}
            />
            <span className='flex-1 text-center'>to</span>
            <input
              type="number"
              name="ageMax"
              placeholder="Max Age"
              className="input input-bordered flex-2"
              onChange={handleInputChange}
            />
          </div>
        </li>
        <li className="mb-7">
          <input
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            className="input input-bordered w-full"
            onChange={handleInputChange}
          />
        </li>
        <li>
          <BreedSearch onSelect={handleBreedSelect} />
        </li>

        <h2 className='text-2xl text-center font-bold mb-2'>Sort</h2>

        <li className="flex flex-row">
          <select
            className="select w-full flex-1"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="breed">Breed</option>
            <option value="age">Age</option>
          </select>
          <div className="flex flex-1 items-center space-x-2">
            <span>Asc</span>
            <input
              type="checkbox"
              className="toggle border-indigo-600 bg-indigo-500 checked:bg-orange-400 checked:text-orange-800 checked:border-orange-500"
              checked={sortOrder === 'desc'}
              onChange={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            />
            <span>Desc</span>
          </div>
        </li>
        <li>
          <button
            type="button"
            className="btn btn-primary mt-7"
            onClick={applyFilters}
          >
            Search
          </button>
        </li>
      </div>
      <li className="mt-auto">
        <LogoutButton />
      </li>
    </div>
  );
}

export default Search;