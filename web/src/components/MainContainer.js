import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import InitialForm from './InitialForm';

const INITIAL_FORM = "initialForm";
const CONTACTS_PAGE = "contactsComponent";
const TRANSACTION_SUMMARY = "transactionSummary";
const ETHERSCAN_CONFIRMATION = "etherscanConfirmation";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: "a" 
    }
    this.handleChange = this.handleChange.bind(this) 
  }

  handleChange() {
    console.log("we changed some input " + this.state.currentState);
    if(this.state.currentState == INITIAL_FORM){
      this.setState({currentState: CONTACTS_PAGE})
    } else if(this.state.currentState == CONTACTS_PAGE) {
      this.setState({currentState: TRANSACTION_SUMMARY})
    } else if(this.state.currentState == TRANSACTION_SUMMARY) {
      this.setState({currentState: ETHERSCAN_CONFIRMATION})
    } else {
      this.setState({currentState: INITIAL_FORM})
    }
  }

  render() {
      if(this.state.currentState == "a") {
          return <InitialForm formChanged={this.handleChange} />
      } else if (this.state.currentState == "b") {
        return <div> contacts </div>
      } else {
        return <div> last </div>
      }
    }
  }
  
  export default MainContainer;