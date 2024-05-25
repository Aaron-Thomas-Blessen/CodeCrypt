import React from 'react';
import Navbar from "../components/nav2";
import AlgorithmCard from "../components/ac";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Components for each algorithm's detailed steps
import RSADetails from '../components/RSADetails';
import AESDetails from '../components/AESDetails';
import DESDetails from '../components/DESDetails';
import SHADetails from '../components/SHADetails';

const Study = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/study/rsa">
            <RSADetails />
          </Route>
          <Route path="/study/aes">
            <AESDetails />
          </Route>
          {/* Add similar routes for other algorithms */}
          <Route path="/study">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Link to="/study/rsa">
                <AlgorithmCard title="RSA" details="Click to view RSA steps." />
              </Link>
              {/* Repeat for other algorithm cards */}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Study;