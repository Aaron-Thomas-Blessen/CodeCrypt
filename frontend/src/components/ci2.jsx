import React, { useRef, useEffect } from 'react';

const CopyableInput = ({ value }) => {
  const textAreaRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    alert('Code copied to clipboard');
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div className="relative">
      <textarea
        ref={textAreaRef}
        readOnly
        className="bg-gray-900 p-4 rounded-md w-full overflow-x-auto whitespace-pre-wrap"
        style={{ minHeight: '200px', maxHeight: '500px', resize: 'none' }}
        value={value}
      />
      <button
        onClick={handleCopy}
        className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Copy
      </button>
    </div>
  );
};

export default CopyableInput;
