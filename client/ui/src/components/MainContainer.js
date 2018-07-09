import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const styles = {
  text : {
      color: 'white'
  }
}

class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: ""
    }
  }

  updatePassword(event) {
    console.log("Password " + event.target.value);
    this.setState({password: event.target.value })
  }

  submitPassword() {
    console.log(this.state.password);
  }


  render() {
    return (
      <div>
        <Form>
          <Form.Field>
          <label style={styles.text} >Password</label>
          <input     
              value={this.state.password}
              placeholder='password' 
              onChange={this.updatePassword.bind(this)}
          />
          </Form.Field>
          <Button onClick={()=> this.submitPassword()}>Confirm</Button>    
        </Form>
      </div>
    );
  }
}

export default MainContainer;