import React from 'react';

const AlgorithmCard = ({ title, details, onClick, completed }) => {
  return (
    <div
      className={`relative group p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${completed ? 'bg-green-600 text-white' : 'bg-white dark:bg-zinc-800'}`}
      onClick={onClick}
    >
      <h3 className={`text-lg font-semibold ${completed ? 'text-white' : 'text-zinc-800 dark:text-zinc-200'}`}>{title}</h3>
      <p className={`hidden group-hover:block text-sm mt-2 ${completed ? 'text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>{details}</p>
    </div>
  );
};

export default AlgorithmCard;