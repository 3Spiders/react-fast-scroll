import React from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import ScrollView from './containers/scroll-view';

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
