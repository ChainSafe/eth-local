import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import InitialForm from './components/InitialForm';
import Loading from './components/Loading';


class App extends Component {

  // componentDidMount = () => {
  //   axios.get('http://localhost:3210/req')
  // }

  constructor(props) {
    super(props);
    this.state = {
      data: false
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          { 
            this.state.data ? <Loading /> : <InitialForm />
          }        
          <h1 className="App-title">Access your encrypted wallets</h1>
        </header>
      </div>
    );
  }
}

export default App;
