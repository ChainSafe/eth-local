import React, { Component } from 'react'
import { Button, Checkbox, Form, List } from 'semantic-ui-react'
import axios from 'axios';
import Loading from './Loading';
import provider from '../constants/Provider';
const ethers = require('ethers');
const utils = ethers.utils;


const styles = {
    text : {
        color: 'black',
        width: "500px",
        // whiteSpace: 'nowrap', 
        // textOverflow: 'ellipsis',
        wordWrap: "break-word",
        overflow:'hidden',
        height: '100px'
    }, 
    mainContainer : {
      paddingTop: 100
    }
}

class VerefiedHash extends Component {

    constructor(props) {
        super(props);
        this.state = {           
            loading: false, 
            data: ""           
        }
    }

    componentWillMount() {
        var query = axios.get('http://localhost:3210/getSignedTransaction')
        .then((response) => {          
           console.log(response.data);   
           this.setState({data: response.data})     
           return response.data; 
        });
        return query;
    }
  
    render() {
        return (
            <div>
                {
                    this.state.data != "" ? 
                    <div style={styles.mainContainer}>
                         <h5 style={styles.text}> 
                         {
                             JSON.stringify(this.state.data) 
                         } 
                         </h5> 
                    </div>

                    : <Loading /> 
                }    

            <Button onClick={()=> this.props.formChanged()}>Send Another Transaction</Button>   
          </div>
      );
    }
  }
  
  export default VerefiedHash;


