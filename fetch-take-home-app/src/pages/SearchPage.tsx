import React, { useState } from 'react';
import Display from '../components/Display';
import Search from '../components/Search';

function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const resetPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen min-w-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center p-4">
        <Display currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full h-full w-80 p-4">
          <Search resetPage={resetPage} />
        </ul>
      </div>
    </div>
  );
}

export default SearchPage;
