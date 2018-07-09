import React, { Component } from 'react'
import { Button, Checkbox, Form, List } from 'semantic-ui-react'
import axios from 'axios';
import Loading from './Loading';
import provider from '../constants/Provider';
const ethers = require('ethers');
const utils = ethers.utils;


const styles = {
    text : {
        color: 'black'
    }, 
    mainContainer : {
      paddingTop: 30
    }
}


class TransactionSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {           
            loading: false,            
        }
    }


    sendTransaction = () => {
        const amountString = '' + this.props.sendAmount  + '';
        const receivingAddress = this.props.toAddress;
        const amount = ethers.utils.parseEther(amountString);
        const currentWallet = new ethers.Wallet("0x923ed0eca1cee12c1c3cf7b8965fef00a2aa106124688a48d925a778315bb0e5");
        currentWallet.provider = provider;

        const sendPromise = currentWallet.send(receivingAddress, amount);
        sendPromise.then(function (transactionHash) {
          console.log(transactionHash);
          provider.getBalance(currentWallet.address).then(function (balance) {
            const etherString = utils.formatEther(balance);
            console.log("currentWallet Balance: " + etherString);
          });
          provider.getBalance(receivingAddress).then(function (balance) {
            const etherString = utils.formatEther(balance);
            console.log("receiving account Balance: " + etherString);
          });
        });


      }
    

    render() {
        return (
            <div>
            <h3 style={styles.text} > To: {this.props.toAddress}  </h3>
            <h3 style={styles.text}> From: {this.props.fromAddress}  </h3>
            <h3 style={styles.text}> Value: {this.props.sendAmount}  </h3>    
            <Button onClick={()=> this.props.formChanged()}>Confirm and Send</Button>                 
          </div>
      );
    }
  }
  
  export default TransactionSummary;


