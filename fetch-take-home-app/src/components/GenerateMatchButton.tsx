import React from 'react';
import { useDispatch } from 'react-redux';
import { generateMatch } from '../redux/dogSlice';
import MatchModal from './MatchModal';

interface GenerateMatchButtonProps {
  favorites: string[];
}

const GenerateMatchButton: React.FC<GenerateMatchButtonProps> = ({ favorites }) => {
  const [matchLoading, setMatchLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleGenerateMatch = async () => {
    setMatchLoading(true);
    try {
      await dispatch(generateMatch(favorites)).unwrap();
      document.getElementById('match_modal')?.showModal();
    } catch (error) {
      console.error('Failed to generate match:', error);
    } finally {
      setMatchLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-primary w-44"
        onClick={handleGenerateMatch}
        disabled={favorites.length === 0 || matchLoading}
      >
        {matchLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          `Generate Match (${favorites.length})`
        )}
      </button>

      <MatchModal 
        isOpen={false} 
        onClose={() => {
          const modal = document.getElementById('match_modal') as HTMLDialogElement;
          modal?.close();
        }} 
      />
    </>
  );
};

export default GenerateMatchButton;