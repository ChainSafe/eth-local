import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import InitialForm from './InitialForm';
import Wallets from './Wallets';

const INITIAL_FORM = "initialForm";
const WALLETS_PAGE = "contactsComponent";
const TRANSACTION_SUMMARY = "transactionSummary";
const ETHERSCAN_CONFIRMATION = "etherscanConfirmation";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: INITIAL_FORM,
      to: "",
      value: "",
      chosenWallet: "" 
    }
    this.handleChange = this.handleChange.bind(this) 
    this.updateTo = this.updateTo.bind(this) 
    this.updateValue = this.updateValue.bind(this) 
    this.selectedWallet = this.selectedWallet.bind(this)
  }

  handleChange(data) {
    console.log("we changed some input " + this.state.currentState);

    if(this.state.currentState == INITIAL_FORM){     
      this.setState({currentState: WALLETS_PAGE})
    } else if(this.state.currentState == WALLETS_PAGE) {
      this.setState({currentState: TRANSACTION_SUMMARY})
    } else if(this.state.currentState == TRANSACTION_SUMMARY) {
      this.setState({currentState: ETHERSCAN_CONFIRMATION})
    } else {
      this.setState({currentState: INITIAL_FORM})
    }
  }

  updateTo(toVal) {
    console.log("to : " + toVal);
    this.setState({to: toVal })
  }

  updateValue(valueVal) {
    console.log("value-: " + valueVal);
    this.setState({value: valueVal })
  }

  selectedWallet(chosenWalletAddress) {
    console.log("wallet that was chosen: " + chosenWalletAddress);
    this.setState({chosenWallet: chosenWalletAddress})
  }

  render() {
      if(this.state.currentState == INITIAL_FORM) {
        return <InitialForm changeTo={this.updateTo} changeValue={this.updateValue} formChanged={this.handleChange} />
      } else if (this.state.currentState == WALLETS_PAGE) {
        return <Wallets  selectWallet={this.selectedWallet} formChanged={this.handleChange} />
      } else {
        return <div> last </div>
      }
    }
  }
  
  export default MainContainer;