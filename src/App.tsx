
import {TextField} from '@material-ui/core';
import * as React from 'react';
import './App.css';
import {Header} from './components/Header';


interface IState {
  // weatherInfo: Response[],
  results: any,
  inputCity: any,
  todayIcon: any,
  todayDesc: any,
  tomorrowIcon: any,
  tomorrowDesc: any,
  todayUrl: string,
  tomorrowUrl: string,
  error: any
  // weatherInfo: any[]
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      // weatherInfo: [],
      results: "",
      inputCity: "",
      todayIcon: "",
      todayDesc: "",
      tomorrowIcon: "",
      tomorrowDesc: "",
      todayUrl: "",
      tomorrowUrl: "",
      error: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  public getData(city: any) {
    
    const url = "https://api.weatherbit.io/v2.0/forecast/daily?key=a539bf89da9a40c0ae97ebb30d5e34a3&city=" + city;
    fetch(url, {
      method: "GET",
      headers: {
        "content-Type": "text/plain",
      }
    })
    .then((response: any) => {
      if (response.statusText === "No Content") {
        this.setState({results: "Error: Incorrect city name"});
        console.log("if block");
      }
      else {
        this.setState({results: ""});
        return response.json();
      }
    })
    .then((data: any) => {
      if (this.state.results !== "Error: Incorrect city name") {
        const weatherData = data.data;
        this.setState({
          todayIcon: weatherData[0].weather.icon,
          todayDesc: weatherData[0].weather.description,
          tomorrowIcon: weatherData[1].weather.icon,
          tomorrowDesc: weatherData[1].weather.description,
          todayUrl: "https://www.weatherbit.io/static/img/icons/" + weatherData[0].weather.icon + ".png",
          tomorrowUrl: "https://www.weatherbit.io/static/img/icons/" + weatherData[1].weather.icon + ".png"
        });
      }
      this.updateContent();
    } );
  }

  public updateContent() {
    if (this.state.results !== "Error: Incorrect city name") {
      document.getElementById("forecast-city")!.innerHTML = "Weather forecast for " + this.state.inputCity;
      document.getElementById("header-today")!.innerHTML = "Weather forecast for today";
      document.getElementById("header-tomorrow")!.innerHTML = "Weather forecast for tomorrow";

      document.getElementById("forecast-div")!.style.border = "black solid 1px";


      // document.getElementById("forecast-city")!.innerHTML = "";
      // document.getElementById("header-today")!.innerHTML = "";
      // document.getElementById("header-tomorrow")!.innerHTML = "";
      // document.getElementById("forecast-div")!.style.border = "white";
      // document.getElementById("image-today")!.style.display = "none";
      // document.getElementById("image-tomorrow")!.style.display = "none";
      // document.getElementById("desc-today")!.style.display = "none";
      // document.getElementById("desc-tomorrow")!.style.display = "none";
    }
  }

  public getWeatherInfo() {
    const city = this.state.inputCity;
    this.getData(city);
  }
  
  public handleClick() {
    this.getWeatherInfo();
    
  }

  public handleChange(event: any) {
    this.setState({inputCity: event.target.value});
  }

  public render() {
    return (
      <div>
        <Header/>
        <div className="app-body">
          <h1>Welcome!</h1>
          <p className="App-intro">
            Look up the weather forecast for today and tomorrow! Type in a city name below to get started.
          </p>
          <div className="search">
              <TextField 
                label="City name"
                onChange={this.handleChange}
                />
              <button onClick={this.handleClick}>Search</button>
            
          </div>
          
          <p id="error">{this.state.results}</p>

          <div id="forecast-div" className="forecast">
            <h2 id="forecast-city"/>
            <div className="forecast-css">
              <h3 id="header-today"/>
              <img id="image-today"src={this.state.todayUrl}/>
              <p id="desc-today">{this.state.todayDesc}</p>
            </div>
            <div className="forecast-css">
              <h3 id="header-tomorrow"/>
              <img id="image-tomorrow" src={this.state.tomorrowUrl} />
              <p id="desc-tomorrow">{this.state.tomorrowDesc}</p>
            </div>
          </div>


          {/* <p id="test">Test output: <br/></p> */}
         
        </div>
      </div>
    );
  }
}