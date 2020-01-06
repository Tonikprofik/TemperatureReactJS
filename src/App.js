import React from 'react';
import './App.css';
import xhr from 'xhr';

const API_KEY = "5b7064fe0f023fdb8d09376ea10db552";

class App extends React.Component {
  state = {
      location: '',
      data: {}
  };

  fetchData = (evt) => {
    evt.preventDefault();
    
    if (!API_KEY) {
      console.log('Enter your API_KEY and the enter location');
      return;
    }
    
    let location = encodeURIComponent(this.state.location);
    let urlPrefix = '/cors/http://api.openweathermap.org/data/2.5/weather?q=';
    let urlSuffix = '&APPID=' + API_KEY + '&units=metric';
    let url = urlPrefix + location + urlSuffix;
    
    xhr({
      url: url
    }, (err, data) => {
      if (err) {
        console.log('Error:', err);
        return;
      }
      
      this.setState({
        data: JSON.parse(data.body)
      });
    });
  };

  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  render() {
    let currentTemp = 'Enter a city';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div>
        <h1>Current temperature</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the temperature for
            <input
              placeholder={"City, Country"}
              type="text"
              value={this.state.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        <p className="temp-wrapper">
          <span className="temp">{ currentTemp }</span>
          <span className="temp-symbol">°C</span>
        </p>
      </div>
    );
  }
}

export default App;