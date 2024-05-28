import React from 'react';

const AlgorithmCard = ({ title, details }) => {
  return (
    <div className="relative group p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{title}</h3>
      <p className="hidden group-hover:block text-sm text-zinc-600 dark:text-zinc-400 mt-2">{details}</p>
    </div>
  );
};

export default AlgorithmCard;
