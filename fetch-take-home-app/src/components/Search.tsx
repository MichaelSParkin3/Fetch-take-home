import React, { useState } from 'react';
import BreedSearch from './BreedSearch';
import { useDispatch } from 'react-redux';
import { fetchDogs } from '../redux/dogSlice';

function Search() {
  const [filters, setFilters] = useState<Partial<Dog>>({});
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
    dispatch(fetchDogs({ filters }));
    console.log('applying filters');
  };

  return (
    <>
      <div className="flex justify-center align-middle">
        <div>
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
              name="name"
              value={filters.name || ''}
              onChange={handleInputChange}
              required
              placeholder="Name"
            />
          </label>
        </div>
        <button
          className="btn"
          onClick={() => document.getElementById('my_modal_5').showModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Filter Dogs</h3>
            <form className="py-4 space-y-4">
              <input
                type="text"
                name="name"
                value={filters.name || ''}
                placeholder="Name"
                className="input input-bordered w-full"
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="input input-bordered w-full"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="zip_code"
                placeholder="Zip Code"
                className="input input-bordered w-full"
                onChange={handleInputChange}
              />
              <BreedSearch onSelect={handleBreedSelect} />
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default Search;
