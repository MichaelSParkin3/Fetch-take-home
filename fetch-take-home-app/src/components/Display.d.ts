import React from 'react';
interface DisplayProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}
declare const Display: React.FC<DisplayProps>;
export default Display;
