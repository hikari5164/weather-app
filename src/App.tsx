import * as React from 'react';
import './App.css';

interface IState {
  data: any[],
  results: any
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      results: ""
    };
  }

  public componentWillMount() {
    this.getData();
  }

  public getData() {
    fetch("https://api.weatherbit.io/v2.0/forecast/hourly?key=a539bf89da9a40c0ae97ebb30d5e34a3&city=Auckland", {
      method: "GET",
      headers: {
        "content-Type": "text/plain",
      }
    })
    .then((response: any) => {
      if (!response.ok) {
        this.setState({results: response.statusText});
      }
      else {
        this.setState({results: response.statusText});
      }
      return response.json();
    })
    .then((data: any) => {
      const dataInfo = data.city_name;
      document.getElementById("test")!.innerHTML += dataInfo;
      console.log(dataInfo);
    } );
  }
  

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Weather Forecast</h1>
        </header>
        <p className="App-intro">
          Hello World!
        </p>
        <p id="test">Test output: <br/></p>
        <p>Response Status: {this.state.results}</p>
      </div>
    );
  }
}
