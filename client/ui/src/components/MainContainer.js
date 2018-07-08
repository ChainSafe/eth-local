import React, { Component } from 'react'

class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataEntered: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    console.log("we changed some input");
  }


  render() {
    return (
      <div>
        <h1>HEEEEY</h1>
      </div>
    );
  }
}

export default MainContainer;