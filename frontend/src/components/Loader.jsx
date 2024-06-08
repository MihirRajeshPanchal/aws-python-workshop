import React from 'react';

const Loader = ({ loadingText }) => {
  return (
    <div className="flex flex-col items-center h-screen">
      <p className="mt-4 text-gray-700">{loadingText}</p>
      <div className="mt-5 animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 mb-4"></div>
    </div>
  );
};

export default Loader;