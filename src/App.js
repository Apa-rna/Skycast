import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    console.log('API Key:', apiKey); // Debugging: Log API Key
    console.log('API URL:', url);   // Debugging: Log API URL

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setError('');
      })
      .catch((error) => {
        setError('Fetching weather data failed.');
      });
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData();
      setLocation('');
    }
  };

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const WeatherDetails = () => {
    return (
      <>
        <div className="feels">
          {data.main ? (
            <>
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              <p>Feels Like</p>
            </>
          ) : null}
        </div>

        <div className="humidity">
          {data.main ? (
            <>
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </>
          ) : null}
        </div>
        <div className="wind">
          {data.wind ? (
            <>
              <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              <p>Wind Speed</p>
            </>
          ) : null}
        </div>
      </>
    );
  };

  return (
    <div className="app">
      <div className="created-by">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://www.freeiconspng.com/thumbs/cloud-rain-icons/rain-cloud-icon-24.jpg"
            alt="Skycast Logo"
            style={{ marginRight: '10px', width: '50px', height: '50px' }}
          />
          <div>
            <h1 style={{ fontWeight: 'bold', color: '#11009E', marginBottom: '0' }}>Skycast</h1>
            <h2 style={{ fontWeight: 'bold', color: '#11009E' }}>Created by Aparna</h2>
          </div>
        </div>
      </div>

      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name && !error && (
          <div className="bottom">
            <WeatherDetails />
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
