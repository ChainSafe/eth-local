import React, { Component } from 'react';
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
    }, 2000);
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

