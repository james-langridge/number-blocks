import React from 'react';
import './App.css';

function shuffleArray(arr: number[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function App() {
    function clickHandler() {
        console.log('clicked')
    }

    const numSquares = 8;
    const gridSquares = [];
    const numbers = [];

    for (let i = 0; i < numSquares; i++) {
        numbers.push(i+1);
    }

    const shuffledNumbers = shuffleArray(numbers)

    for (let i = 0; i < numSquares; i++) {
        gridSquares.push(<div key={i} className="grid-item" onClick={clickHandler}>{shuffledNumbers[i]}</div>);
    }

    return (
    <div className="App">
      <div className="grid-container">
          {gridSquares}
      </div>
    </div>
  );
}

export default App;
