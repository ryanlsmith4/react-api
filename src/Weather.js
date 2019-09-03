import React from 'react';

function Weather ({ weatherData, otherData }) {
  const { main, description, icon } = weatherData
  const { temp, pressure, humidity, temp_min, temp_max } = otherData 
  
  return (
    <div>
      <div>Title: {main}</div>
      <div>Desc: {description}</div>
      <div>Icon: {icon}</div>
      <div>Temp: {temp}</div>
      <div>Pressure: {pressure}</div>
      <div>Humidity: {humidity}</div>
      <div>Temp Min: {temp_min} Max:{temp_max}</div>
    </div>
  )
}

export default Weather;
