import React, { useState } from 'react';
import style from './style.module.css';

export default function Cloud() {
  const [cloud, setCloud] = useState();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');


  const fetchdata = async () => {
    if (input.trim() === "") {  // Check if input is empty
      setError("!plz fill the city name");
      setCloud();
      return;
    }
    setError(""); // Clear error when input is valid
    const API = `https://api.weatherapi.com/v1/forecast.json?key=f3451e462d0a4efebff142535230204&q=${input}&days=3`;
    try {
      const response = await fetch(API, { method: 'GET' });
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      const data = await response.json();
      setCloud(data);
    } catch (error) {
      console.error('Fetch error:', error);
      // Optionally set error state to show to the user
    }
  };

  console.log('Weather Data:', cloud);

  const handleOnChange = (e) => {
    setInput(e.target.value);
   
      setError(""); // Clear error on valid input
    
  };

  const { location, current, forecast } = cloud || {};

  return (
    <div style={{ paddingTop: '30px' }}>
      <div className='container' style={{
        backgroundColor: "white",
        paddingBottom: '40px',
        height: "fit-content",
        width: "70%",
        marginLeft: "185px",
        marginTop: "40px",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "verdana",
        color: "#0ea4a4",
        borderRadius: "10px"
      }}>
        <div style={{ fontFamily: "Comic Sans MS" }}>
          <h1 style={{ margin: 'auto', width: 'fit-content' }}>Weather Forecast</h1>
        </div>
        <div style={{ display: "flex", marginBottom: '50px', justifyContent: "center", alignItems: "center", margin: "10px" }}>
          
          <input
            onChange={handleOnChange}
            value={input}
            type="text"
            placeholder="Enter City Name"
            className={style.input}
          />
          {/* {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} */}
          <button
            onClick={fetchdata}
            style={{
              marginLeft: "10px",
              backgroundColor: "#15BCBC",
              color: "white",
              border: "none",
              borderRadius: '5px',
              padding: '6px 12px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Find Weather
          </button>
        </div>
        {error && <p style={{ color: 'red', marginLeft:"215px", marginTop:"-10px"}}>{error}</p>}

        {/* Data show */}
        {cloud && (
          <div className={style.parentDiv}>
            <div className={style.current}>
              <div className={style.cityDiv}>
                <img src={current?.condition?.icon} width="30px" alt="image icon" />
                <h4>{current?.condition?.text}</h4>
                <span>{location?.country},</span>
                <span>{location?.region}</span> {/* Fixed typo here */}
                <h4 className={style.city}>{location?.name}</h4>
                <p>Latitude: {location?.lat}</p>
              </div>
              <div className={style.curWea}>
                <h4>Today: {current?.last_updated}</h4>
                <p>Wind Speed: {current?.wind_kph} km/h</p>
                <p>Temperature: {current?.temp_c} 'C</p>
                <p>Temperature: {current?.temp_f} 'F</p>
                <p>Humidity: {current?.humidity}</p>
              </div>
            </div>
            <div className={style.forecastParent}>
              {forecast?.forecastday?.map((item, index) => (
                <div key={index} className={style.forecastDiv}>
                  <div>
                    <h4>{item.date}</h4>
                    <img src={item.day.condition.icon} width="80px" alt="image icon" />
                  </div>
                  <div>
                    <p>Temperature: {item?.day?.avgtemp_c} 'C</p>
                    <p>Humidity: {item?.day?.avghumidity}</p>
                    <p>Sunrise: {item?.astro?.sunrise}</p>
                    <p>Sunset: {item?.astro?.sunset}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

