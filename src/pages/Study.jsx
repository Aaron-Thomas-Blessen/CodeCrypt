import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/nav2";
import AlgorithmCard from "../components/ac";

const Study = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/study/rsa">
          <AlgorithmCard title="RSA" details="Click to view RSA steps." />
        </Link>
        <Link to="/study/aes">
          <AlgorithmCard title="AES" details="Click to view AES steps." />
        </Link>
        <Link to="/study/des">
          <AlgorithmCard title="DES" details="Click to view DES steps." />
        </Link>
        <Link to="/study/sha">
          <AlgorithmCard title="SHA" details="Click to view SHA steps." />
        </Link>
      </div>
    </div>
  );
};

export default Study;
