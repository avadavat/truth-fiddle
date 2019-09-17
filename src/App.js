import React from 'react';
import './App.css';
import { AppBody } from './view';

/**
 * App is the root wrapper around the application.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppBody />
      </header>
    </div>
  );
}

export default App;
