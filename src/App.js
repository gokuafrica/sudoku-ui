import React from 'react';
import Sudoku from './sudoku';
import './css.css';

function App() {
  return (
    <div className="App center">
      <div className="Title">
        Sudoku<br />Solver
      </div>
      <Sudoku />
    </div>
  );
}

export default App;
