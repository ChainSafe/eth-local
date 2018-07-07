import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const styles = {
    text : {
        color: 'white'
    }
}
class InitialForm extends Component {

    // componentDidMount = () => {
    //   axios.get('http://localhost:3210/req')
    // }

      constructor(props) {
      super(props);
      this.state = {
        to: "",
        value: 0
      }
  }

  updateTo(event) {
    this.setState({to: event.target.value})
    this.props.formChanged();
  }

  updateValue(event) {
    const value = event.target.value;
    if (!isNaN(value)) {
      if (value > 0) {
        this.setState({ value: value });
      } 
    } 
  }

  sendTransactionDetails() {
    console.log("sending transaction details");
    console.log("to: " + this.state.to + " value: " + this.state.value);
    this.props.formChanged();
    // this.props.han
    // axios.get('http://localhost:3210/req', {
    //   params: {
    //     to: this.state.to,
    //     value: this.state.value
    //   }
    // });
  }

  
    render() {
      return (
        <Form>
            <Form.Field>
            <label style={styles.text} >To</label>
            <input     
                value={this.state.to}
                placeholder='Recipient Address' 
                onChange={this.updateTo.bind(this)}
            />
            </Form.Field>
            <Form.Field>
            <label style={styles.text}>Value</label>
            <input 
                placeholder='Value' 
                value={this.state.value}
                onChange={this.updateValue.bind(this)}
            />
            </Form.Field>
            <Button onClick={()=> this.sendTransactionDetails()}>Confirm</Button> 
            {/* <Button onClick={()=> this.sendTransactionDetails()}>Choose Wallets</Button>
            <Button onClick={()=> this.getContacts()}>Display Wallets</Button> */}
        </Form>
      );
    }
  }
  
  export default InitialForm;