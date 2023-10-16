import React from 'react';
import '../styles/App.css';
import WineStats from './WineStats/WineStats';
import wineData from '../Data/Wine-Data.json';

function App() {
  return (
    <div className="App">
      <WineStats wineData={wineData} />
    </div>
  );
}

export default App;
