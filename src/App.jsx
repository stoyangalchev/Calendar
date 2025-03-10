import React, { useEffect, useState } from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';

function App() {
  const [romanYear, setRomanYear] = useState('');

  useEffect(() => {
    const year = new Date().getFullYear();
    setRomanYear(convertToRoman(year));
  }, []);

  const handleYearChange = (year) => {
    setRomanYear(convertToRoman(year));
  };

  const convertToRoman = (num) => {
    const romanNumerals = [
      { value: 1000, numeral: 'M' },
      { value: 900, numeral: 'CM' },
      { value: 500, numeral: 'D' },
      { value: 400, numeral: 'CD' },
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' },
    ];

    let result = '';
    for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  return (
    <div className="App">
      <h1>Calendar {romanYear}</h1>
      <Calendar onYearChange={handleYearChange} />
    </div>
  );
}

export default App;