import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDogs,
  selectDogs,
  selectTotal,
  selectNext,
  selectPrev,
  toggleFavorite,
  selectFavorites,
  generateMatch
} from '../redux/dogSlice';

interface DisplayProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Display: React.FC<DisplayProps> = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const dogs = useSelector(selectDogs);
  const total = useSelector(selectTotal);
  const nextUrl = useSelector(selectNext);
  const prevUrl = useSelector(selectPrev);
  const favorites = useSelector(selectFavorites);
  const dogsPerPage = 25;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dogs.length === 0 && currentPage === 1) {
      setLoading(true);
      dispatch(fetchDogs({ filters: {}, page: currentPage, dogsPerPage }))
        .finally(() => setLoading(false));
    }
  }, [dispatch, currentPage, dogs.length]);

  const handleNextPage = () => {
    if (nextUrl) {
      setLoading(true);
      dispatch(
        fetchDogs({
          filters: {},
          page: currentPage + 1,
          dogsPerPage,
          url: nextUrl
        })
      ).finally(() => setLoading(false));
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (prevUrl) {
      setLoading(true);
      dispatch(
        fetchDogs({
          filters: {},
          page: currentPage - 1,
          dogsPerPage,
          url: prevUrl
        })
      ).finally(() => setLoading(false));
      setCurrentPage(currentPage - 1);
    }
  };

  const handleToggleFavorite = (dogId: string) => {
    dispatch(toggleFavorite(dogId));
  };

  const handleGenerateMatch = async () => {
    try {
      await dispatch(generateMatch(favorites)).unwrap();
    } catch (error) {
      console.error('Failed to generate match:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4 px-4">
        <h1 className="text-2xl font-bold">Available Dogs</h1>
        <button 
          className="btn btn-primary"
          onClick={handleGenerateMatch}
          disabled={favorites.length === 0}
        >
          Generate Match ({favorites.length})
        </button>
      </div>

      {dogs.length === 0 ? (
        <div className="text-center text-lg font-semibold">
          {currentPage === 1 ? 'No dogs found for this search.' : 'No remaining dogs.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dogs.map((dog) => (
            <div key={dog.id} className="card bg-base-100 w-full max-w-70 shadow-sm">
              <figure className="h-48 overflow-hidden">
                <img
                  src={dog.img || '/api/placeholder/400/300'}
                  alt={dog.name || 'Dog'}
                  className="object-cover w-full h-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {dog.name || 'Unnamed'}
                  <div className="badge badge-secondary">Age: {dog.age}</div>
                </h2>
                <div className="card-actions justify-start">
                  <div className="badge badge-outline">{dog.breed}</div>
                  <div className="badge badge-outline">
                    Zip: {dog.zip_code}
                  </div>
                </div>
                <div className="absolute top-2 right-2 z-10">
                  <div className="rating">
                    <input
                      type="radio"
                      className="mask mask-heart bg-red-400 hover:bg-red-500 opacity-60 checked:bg-red-700"
                      checked={favorites.includes(dog.id)}
                      onChange={() => handleToggleFavorite(dog.id)}
                      aria-label="Add to favorites"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="join mt-4">
        <button
          className="join-item btn"
          onClick={handlePreviousPage}
          disabled={!prevUrl || loading}
        >
          «
        </button>
        <button className="join-item btn">Page {currentPage}</button>
        <button
          className="join-item btn"
          onClick={handleNextPage}
          disabled={!nextUrl || dogs.length === 0 || loading}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Display;