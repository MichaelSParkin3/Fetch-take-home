import React, { useState } from 'react';
import Display from '../components/Display';
import Search from '../components/Search';
import LogoutButton from '../components/LogoutButton';

function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const resetPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen min-w-screen">
      <Search resetPage={resetPage} />
      <Display currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <LogoutButton />
    </div>
  );
}

export default SearchPage;
