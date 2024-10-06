import React, {useState} from 'react'
import style from './style.module.css'

export default function Cloud(){


  const API= "https://api.weatherapi.com/v1/forecast.json?key=f3451e462d0a4efebff142535230204&q=mumbai&days=3"

  const [cloud, setCloud] = useState()

  const fetchdata=async()=>{
    const response = await fetch(API, {method: "get"});
    const data = await response.json()
    setCloud(data)
 
  }
  console.log("descri....", cloud)

  const {
  location, current, forecast
  } = cloud || {}


    return(
        <div style={{paddingTop: '30px'}}>
          <div className='container' style={{backgroundColor: "white",paddingBottom: '40px', height: "fit-content", width:"70%",marginLeft:"185px", marginTop:"40px", margin:"auto", justifyContent:"center", alignItems:"center", fontFamily:"verdana", color:"#0ea4a4", borderRadius:"10px"}}>
            <div style={{ fontFamily:"Comic Sans MS"}} >
              <h1 style={{margin: 'auto', width: 'fit-content'}}>Weather Forecast</h1>
            </div>
          <div style={{display:"flex", marginBottom: '50px', justifyContent:"center", alignItems:"center", margin:"10px"}}>
              <input 
              type="text" 
              placeholder="Enter City Name" 
              className={style.input} />
              <button 
              onClick={fetchdata} 
              style={{
                marginLeft:"10px", 
                backgroundColor:"#15BCBC", 
                color:"white", 
                border:"none",
                borderRadius: '5px',
                padding: '6px 12px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
              >
                Find Weather
              </button>
          
            </div>
            {/* data show */}
            {cloud && 
            <div className={style.parentDiv}>
              <div className={style.current}>
                {/* city details */}
                <div className={style.cityDiv}>
                  <img
                  src={current?.condition?.icon}
                  width="30px"
                  alt="image icon"
                  />
                  <h4>{current?.condition?.text}</h4>
                  <span> {location?.country},</span>
                  <sapn> {location?.region}</sapn>
                  <h4 className={style.city}> {location?.name}</h4>
                  <p>Lattitude: {location?.lat}</p>
                </div>
                {/* current weather */}
                <div className={style.curWea}>
                  <h4>Today: {current?.last_updated}</h4>
                  <p>Wind Speed: {current?.wind_kph} km/h</p>
                  <p>Temperature: {current?.temp_c} 'C</p>
                  <p>Temperature: {current?.temp_f} 'F</p>
                  <p>Humidity: {current?.humidity} </p>
                </div>
              </div> 
              <div className={style.forecastParent}>
              {forecast?.forecastday?.map((item, index)=> (
                <div className={style.forecastDiv}>
                  {/* {console.log("----what is in item --", index, item)} */}
                  <div>
                    <h4>{item.date}</h4> 
                    <p>Sunrise: {item?.astro?.sunrise}</p>
                    <p>Sunset: {item?.astro?.sunset}</p>
                  </div>
                  <div>
                    <p>Temperature: {item?.day?.avgtemp_c} 'C</p>
                    <p>Humidity: {item?.day?.avghumidity}</p>
                  </div>
                </div>
              ))}
              </div>
            </div>
            }
            
          </div>
        </div>
    );
}
