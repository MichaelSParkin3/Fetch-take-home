import React from 'react';
import Display from '../components/Display';
import Search from '../components/Search';
import LogoutButton from '../components/LogoutButton';

function SearchPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen min-w-screen">
        <Search />
        <Display />
        <LogoutButton />
      </div>
    </>
  );
}

export default SearchPage;