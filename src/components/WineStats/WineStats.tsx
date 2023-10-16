import React from 'react';
import './WineStats.css';

interface WineData {
  Alcohol: number;
  Flavanoids: number;
  Ash: number;
  Hue: number;
  Magnesium: number;
}

interface WineStatsProps {
  wineData: WineData[];
}

function calculateMean(data: number[]) {
  const sum = data.reduce((acc, value) => acc + parseFloat(value.toString()), 0);
  return (sum / data.length).toFixed(3);
}

function calculateMedian(data: number[]) {
  data.sort((a, b) => a - b);
  const middle = Math.floor(data.length / 2);
  if (data.length % 2 === 0) {
    const median = (data[middle - 1] + data[middle]) / 2;
    return median.toFixed(3);
  } else {
    return data[middle].toFixed(3);
  }
}

function calculateMode(data: number[]) {
  const counts: Record<number, number> = {};
  data.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });

  let mode: number | null = null;
  let maxCount = 0;
  for (const value in counts) {
    if (counts[value] > maxCount) {
      mode = Number(value);
      maxCount = counts[value];
    }
  }

  return mode !== null ? mode.toString() : '';
}

const WineStats: React.FC<WineStatsProps> = ({ wineData }) => {
  const classes = Array.from(new Set(wineData.map((wine) => wine.Alcohol)));
  const flavanoidsData = classes.map((cls) =>
    wineData.filter((wine) => wine.Alcohol === cls).map((wine) => wine.Flavanoids)
  );
  const gammaData = classes.map((cls) =>
    wineData.filter((wine) => wine.Alcohol === cls).map((wine) => (wine.Ash * wine.Hue) / wine.Magnesium)
  );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {classes.map((cls, index) => (
              <th key={index}>Alcohol {cls}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavanoids Mean</td>
            {flavanoidsData.map((data, index) => (
              <td key={index}>{calculateMean(data)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            {flavanoidsData.map((data, index) => (
              <td key={index}>{calculateMedian(data)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Mode</td>
            {flavanoidsData.map((data, index) => (
              <td key={index}>{calculateMode(data)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mean</td>
            {gammaData.map((data, index) => (
              <td key={index}>{calculateMean(data)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {gammaData.map((data, index) => (
              <td key={index}>{calculateMedian(data)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {gammaData.map((data, index) => (
              <td key={index}>{calculateMode(data)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WineStats;