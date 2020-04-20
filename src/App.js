import React, { useState, useEffect } from 'react';
import Particles from 'react-particles-js';
import Search from './components/search/search.component';
import CardList from './components/cardList/cardList.component';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    const response = await fetch(
      `https://coronavirus-19-api.herokuapp.com/countries/`
    );
    const data = await response.json();
    setCountryData(data);
  };

  const filterData = countryData.filter((countries) => {
    return countries.country.toLowerCase().includes(searchItem.toLowerCase());
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <h2 className='h2'>COVID-19 Tracker</h2>
        <br />
        <br />
        <Particles className='particles' params={particlesOptions} />

        <Search handleSearch={(e) => setSearchItem(e.target.value)} />
        <CardList countryData={filterData} />
      </header>
    </div>
  );
};

export default App;
