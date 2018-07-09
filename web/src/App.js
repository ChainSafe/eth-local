import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import InitialForm from './components/InitialForm';
import Loading from './components/Loading';
import MainContainer from './components/MainContainer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: false
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ data: true })  
    }, 500);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          { 
            this.state.data ? <MainContainer /> : <Loading /> 
          }                  
        </header>
      </div>
    );
  }
}

export default App;
