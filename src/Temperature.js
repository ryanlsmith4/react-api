import React from 'react';

function Temperature ({ tempData }) {
  const tempDataFar = Math.round((tempData - 273.15) * 9/5 + 32)
    return (
      <div>
        <div>Temp {tempDataFar}</div>
        <small>Temperature is rounded for consistancy</small>
      </div>
    )
}

export default Temperature;