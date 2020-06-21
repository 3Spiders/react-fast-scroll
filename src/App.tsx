import React from 'react';
import logo from './logo.svg';
import './App.css';
import Scroll1 from './containers/scroll1';

function App() {

  function pullDown(): Promise<boolean> {
    console.log('test');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(false);
      }, 2000);
    });
  }

  function pullUp(): Promise<boolean> {
    console.log('pullUp');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(false);
        console.log(123333333);
      }, 2000);
    });
  }


  return (
    <Scroll1 pullDown={pullDown} pullUp={pullUp}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    </Scroll1>
  );
}

export default App;
