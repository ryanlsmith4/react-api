import React from 'react';
import Temperature from './Temperature';
import WeatherDescription from './WeatherDescription';
import './Weather.css';


function Weather ({ weatherData, otherData }) {
  const { main, description, icon } = weatherData
  const { temp ,pressure, humidity, temp_min, temp_max } = otherData 
  
  return (
    <div className="weather-container">
        < WeatherDescription title={main} description={description} />
        {/* <div>Title: {main}</div>
        <div>Desc: {description}</div> */}
        <div>Icon: {icon}</div>
        < Temperature tempData={temp} />
        {/* <div>Temp: {temp}</div> */}
        <div>Pressure: {pressure}</div>
        <div>Humidity: {humidity}</div>
        <div>Temp Min: {temp_min} Max:{temp_max}</div>
    </div>
  );
};

export default Weather;
