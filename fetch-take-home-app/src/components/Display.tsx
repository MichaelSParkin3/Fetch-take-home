import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDogs,
  selectDogs,
  selectTotal,
  selectNext,
  selectPrev
} from '../redux/dogSlice';

const Display = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const dogs = useSelector(selectDogs);
  const total = useSelector(selectTotal);
  const nextUrl = useSelector(selectNext);
  const prevUrl = useSelector(selectPrev);
  const dogsPerPage = 25;

  useEffect(() => {
    dispatch(fetchDogs({ filters: {}, page: currentPage, dogsPerPage }));
  }, [dispatch]);

  const handleNextPage = () => {
    if (nextUrl) {
      dispatch(
        fetchDogs({
          filters: {},
          page: currentPage + 1,
          dogsPerPage,
          url: nextUrl
        })
      );
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (prevUrl) {
      dispatch(
        fetchDogs({
          filters: {},
          page: currentPage - 1,
          dogsPerPage,
          url: prevUrl
        })
      );
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dogs.map((dog) => (
          <div key={dog.id} className="card bg-base-100 w-full shadow-sm">
            <figure className="h-48 overflow-hidden">
              <img
                src={
                  dog.img ||
                  'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
                }
                alt={dog.name || 'Dog'}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {dog.name || 'Card Title'}
                <div className="badge badge-secondary">{'Age: ' + dog.age}</div>
              </h2>
              <div className="card-actions justify-start">
                <div className="badge badge-outline">{dog.breed}</div>
                <div className="badge badge-outline">
                  {'Zipcode: ' + dog.zip_code}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="join mt-4">
        <button
          className="join-item btn"
          onClick={handlePreviousPage}
          disabled={!prevUrl}
        >
          «
        </button>
        <button className="join-item btn">Page {currentPage}</button>
        <button
          className="join-item btn"
          onClick={handleNextPage}
          disabled={!nextUrl}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Display;
