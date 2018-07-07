import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const styles = {
    text : {
        color: 'white'
    }
}
class MainContainer extends Component {

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
        <div>
          <p> gucci gang </p>
        </div>
      );
    }
  }
  
  export default MainContainer;