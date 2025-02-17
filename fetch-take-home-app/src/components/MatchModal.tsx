// MatchModal.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMatchResult, clearFavorites } from '../redux/dogSlice';

const MatchModal: React.FC = () => {
  const dispatch = useDispatch();
  const matchedDog = useSelector(selectMatchResult);

  if (!matchedDog) return null;

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  return (
    <dialog id="match_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-96">
        <h3 className="font-bold text-lg text-center">
          Your Perfect Match! 🐾
        </h3>

        <div className="card bg-base-100 w-full shadow-sm mt-4">
          <figure className="h-48 overflow-hidden">
            <img
              src={matchedDog.img || '/api/placeholder/400/300'}
              alt={matchedDog.name}
              className="object-cover w-full h-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {matchedDog.name}
              <div className="badge badge-secondary">Age: {matchedDog.age}</div>
            </h2>
            <div className="card-actions justify-start">
              <div className="badge badge-outline h-auto">
                {matchedDog.breed}
              </div>
              <div className="badge badge-outline">
                Zip: {matchedDog.zip_code}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button type="button" className="btn" onClick={handleClearFavorites}>
              Clear Favorites
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default MatchModal;