
import React, { Component } from 'react';

import './App.css';
import Weather from './Weather';

/** 
 * This example illustrates a simple react project 
 * that works with an external API. 
 * 
 * Take note of the comments they point common 
 * problems you will need to solve with React. 
 * 
 * There are two ideas here
 * - Input/Controlled Component Pattern
 * - Conditionally Rendering components 
 * 
 * The project has an input field where a user will
 * input a zip code. It finds weather data for that
 * zip and displays it in a component. 
 * 
 * */

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',     // Used to hold value entered in the input field
      weatherData: null,  // Used to hold data loaded from the weather API
    }
  }

  // Get geo location through browser if available
  getLocByGeo = (e) => {
    e.preventDefault()
    let geo = navigator.geolocation;
      geo.getCurrentPosition((pos) => {
        const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
        const lat = parseFloat(pos.coords.latitude)
        const long = parseFloat(pos.coords.longitude)
        console.log(lat)
        console.log(long)
        console.log(apikey)
        // `api.openweathermap.org/data/2.5/weather?lat=37.7765888&lon=-122.43599359999999&appid=85c03d1f56e15c40107203872a13b232
        // `api.openweathermap.org/data/2.5/weather?lat=37.7765888&lon=-122.43,us&appid=85c03d1f56e15c40107203872a13b232

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`
        
        fetch(url).then((res) => {
          console.log(res)
          
          return res.json()
        }).then((json) => {
          console.log(json)
          this.setState({ weatherData: json})
        }).catch((err) => {
          this.setState({ weatherData: null }) // Clear the weather data we don't have any to display
          // Print an error to the console. 
          console.log('-- Error fetching --')
          console.log(err.message)
        })
      })  
  }

  handleSubmit(e) {
    e.preventDefault()
    // ! Get your own API key ! 
    const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
    // Get the zip from the input
    const zip = this.state.inputValue
    // Form an API request URL with the apikey and zip
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}`
    // Get data from the API with fetch

    fetch(url).then(res => {
      // Handle the response stream as JSON
      console.log(res)
      return res.json()
    }).then((json) => {
      console.log(json)
      // If the request was successful assign the data to component state
      this.setState({ weatherData: json })
      // ! This needs better error checking here or at renderWeather() 
      // It's possible to get a valid JSON response that is not weather 
      // data, for example when a bad zip code entered.
    }).catch((err) => {
      // If there is no data 
      this.setState({ weatherData: null }) // Clear the weather data we don't have any to display
      // Print an error to the console. 
      console.log('-- Error fetching --')
      console.log(err.message)
      // You may want to display an error to the screen here. 
    })
  }

  renderWeather() {
    // This method returns undefined or a JSX component
    if (this.state.weatherData === null ) {
      return <div> Enter A zip</div>;
    }
    else if (this.state.weatherData.cod !== 200) {
      return <div>Something Bad Happened....</div>
    }
    // console.log(this.state.weatherData.weather[0])
    return < Weather weatherData={this.state.weatherData.weather[0]} otherData={this.state.weatherData.main } />
  };

  render() {
    return (
      <div className="App">

        {/** This input uses the controlled component pattern */}
        <form onSubmit={e => this.handleSubmit(e)}>

          {/** 
          This pattern is used for input and other form elements 
          Set the value of the input to a value held in component state
          Set the value held in component state when a change occurs at the input 
          */}
          <input 
            value={this.state.inputValue}
            onChange={e => this.setState({ inputValue: e.target.value })}
            type="text" 
            pattern="(\d{5}([\-]\d{4})?)"
            placeholder="enter zip"
          />

          <button type="submit">Get Weather By Zip</button>
        </form>


        <form onSubmit={e => this.getLocByGeo(e)}>
          <button type='submit'>Get Weather By GeoLocation</button>
        </form>

        {/** Conditionally render this component */}
        {this.renderWeather()}
        

      </div>
    );
  }
}

export default App;
