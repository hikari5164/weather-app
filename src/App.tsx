import * as React from 'react';
import './App.css';

import logo from './logo.svg';

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
    fetch("https://ghibliapi.herokuapp.com/films?title=Castle%20in%20the%20Sky", {
      method: "GET",
      headers: {
        "content-Type": "text/plain",
      }
    })
    .then((response: any) => {
      return response.json();
    })
    .then((data: any) => {
      for (const element of data) {
        const title = element.title;
        document.getElementById("test")!.innerHTML += title;
        console.log(title);
      }
    } );
    //   if (!response.ok) {
    //     this.setState({results: response.statusText})
    //   }
    //   else {
    //     response.json().
    //   }
  }
  

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Hello World!
        </p>
        <p>Test output</p>
        <p id="test"/>
      </div>
    );
  }
}
