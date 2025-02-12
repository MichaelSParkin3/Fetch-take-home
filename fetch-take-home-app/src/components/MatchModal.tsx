import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMatchResult } from '../redux/dogSlice';
import { BASE_URL } from '../utils/constants';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DogMatch {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose }) => {
  const [matchedDog, setMatchedDog] = useState<DogMatch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const matchResult = useSelector(selectMatchResult);

  useEffect(() => {
    const fetchMatchedDog = async () => {
      if (!matchResult) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${BASE_URL}/dogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([matchResult]),
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch matched dog details');
        }

        const data = await response.json();
        setMatchedDog(data[0]);
      } catch (err) {
        setError('Failed to load match details');
        console.error('Error fetching matched dog:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && matchResult) {
      fetchMatchedDog();
    }
  }, [matchResult, isOpen]);

  return (
    <dialog id="match_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Your Perfect Match! 🐾</h3>
        
        {loading && (
          <div className="flex justify-center p-4">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        
        {error && (
          <div className="text-error text-center p-4">
            {error}
          </div>
        )}
        
        {matchedDog && (
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
                <div className="badge badge-outline h-auto">{matchedDog.breed}</div>
                <div className="badge badge-outline">
                  Zip: {matchedDog.zip_code}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default MatchModal;