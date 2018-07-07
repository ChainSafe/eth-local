import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class Contacts extends Component {

    componentDidMount = () => {
        axios.get('http://localhost:3210/wallets')
        .then(function(response){
            console.log(response.data);
        }); 
    }

    constructor(props) {
        super(props);
        this.state = {
        contacts: [] 
    }
  }

    getContacts() {
      console.log(this.state.contacts)
     }

  
    render() {
      return (
        <div>
            <p> in the contacts </p>
        </div>
      );
    }
  }
  
  export default Contacts;

