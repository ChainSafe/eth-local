import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import InitialForm from './InitialForm';

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
        {
          this.state.dataEntered ?  <p> gucci gang </p> : <InitialForm formChanged={this.handleChange} />
        }
      </div>
    );
  }
  }
  
  export default MainContainer;