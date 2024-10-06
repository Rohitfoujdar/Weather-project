import React, { useState } from 'react';

export default function WeatherComponent () {
  const [state, setState] = useState({
    weatherData: null,  // For storing fetched data
    loading: false,     // For loading state
    error: null,        // For error handling
  });

  const [location, setLocation] = useState('');  // To store the user input location

  const fetchWeatherData = async () => {
    // setState({
    //   ...state,
    //   loading: true,   // Set loading to true when fetching starts
    //   error: null,     // Reset error when new fetch starts
    // });

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=f3451e462d0a4efebff142535230204&q=${location}&days=5`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setState({
        weatherData: data,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState({
        weatherData: null,
        loading: false,
        error: err.message,
      });
    }
  };

  const { weatherData, loading, error } = state;  // Destructure the state for easy access

  return (
    <div>
      <h1>Weather Forecast</h1>

      {/* Input for location and button to trigger API call */}
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)} // Update location state on input change
        placeholder="Enter location"
      />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {/* Conditional rendering for loading, error, and weather data */}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {weatherData && (
        <div>
          <p>Location: {weatherData.location.name}, {weatherData.location.region}</p>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <h2>Forecast:</h2>
          <ul>
            {weatherData.forecast.forecastday.map((day) => (
              <li key={day.date}>
                <p>Date: {day.date}</p>
                <p>Max Temp: {day.day.maxtemp_c} °C</p>
                <p>Min Temp: {day.day.mintemp_c} °C</p>
                <p>Condition: {day.day.condition.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// export default WeatherComponent;
