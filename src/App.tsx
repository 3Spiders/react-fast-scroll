import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/tab1">Tab1</Link>
      </li>
      <li>
        <Link to="/tab2">Tab2</Link>
      </li>
      <li>
        <Link to="/list">list</Link>
      </li>
    </>
  );
};

export default App;
