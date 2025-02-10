import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDogs, selectDogs, selectTotal } from '../redux/dogSlice';

const Display = () => {
  const dispatch = useDispatch();
  const dogs = useSelector(selectDogs);
  const total = useSelector(selectTotal);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 25;

  useEffect(() => {
    dispatch(fetchDogs({ page: currentPage, dogsPerPage }));
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    if (currentPage * dogsPerPage < total) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4">
        {dogs.map((dog) => (
          <div key={dog.id} className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                src={dog.img || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                alt={dog.name || "Dog"}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {dog.name || "Card Title"}
                <div className="badge badge-secondary">{'Age: '+dog.age}</div>
              </h2>
              <div className="card-actions justify-start">
                <div className="badge badge-outline">{dog.breed}</div>
                <div className="badge badge-outline">{"Zipcode: "+dog.zip_code}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage * dogsPerPage >= total}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Display;