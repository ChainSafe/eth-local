import React, { Component } from 'react'
import { Button, Checkbox, Form, List } from 'semantic-ui-react'
import axios from 'axios';

class Contacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            loading: false
        }

    }

    componentDidMount = () => {      
        this.getContacts();
    }

    getContacts() {
      //console.log(this.state.contacts)    
      var x = axios.get('http://localhost:3210/wallets')
      .then((response) => {          
          this.setState({contacts: response.data}) 
          this.setState({loading: true}) 
          return response.data; 
      });
      return x;
    }


    render() {

        const items = this.state.contacts;
        // console.log(items);

     
        // const ListExampleFloated = () => (
        //     <List divided verticalAlign='middle'>
        //       <List.Item>
        //         <List.Content floated='right'>
        //           <Button>Add</Button>
        //         </List.Content>          
        //         <List.Content>Lena</List.Content>
        //       </List.Item>
        //       <List.Item>
        //         <List.Content floated='right'>
        //           <Button>Add</Button>
        //         </List.Content>             
        //         <List.Content>Lindsay</List.Content>
        //       </List.Item>
        //       <List.Item>
        //         <List.Content floated='right'>
        //           <Button>Add</Button>
        //         </List.Content>               
        //         <List.Content>Mark</List.Content>
        //       </List.Item>
        //       <List.Item>
        //         <List.Content floated='right'>
        //           <Button>Add</Button>
        //         </List.Content>       
        //         <List.Content>Molly</List.Content>
        //       </List.Item>
        //     </List>
        //   )


      return (
        <div>
             <p> in the contacts </p>   

            {
                  this.state.loading ? <p> stuff is loaded </p> : <p> content is not yet loaded </p>
            }
                  
        </div>
      );
    }
  }
  
  export default Contacts;

