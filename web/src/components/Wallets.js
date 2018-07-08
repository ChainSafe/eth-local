import React, { Component } from 'react'
import { Button, Checkbox, Form, List } from 'semantic-ui-react'
import axios from 'axios';
import Loading from './Loading';

class Wallets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wallets: [],
            loading: false,
        }
    }

    componentDidMount = () => {      
        var result = this.getWallets();
        result.then((resultData) => {
            // console.log(resultData)
            this.setState({loading: true}) 
        });
    }

    getWallets() {  
      var query = axios.get('http://localhost:3210/wallets')
      .then((response) => {          
          this.setState({wallets: response.data})         
          return response.data; 
      });
      return query;
    }

    renderList() {
    
        var listItems = [];

         for(var key in this.state.wallets) {
            console.log(key);
            listItems.push(key)          
         }

        return (
            <List divided verticalAlign='middle'>                
                {
                    listItems.map((elem) =>  
                        <List.Item key={elem} > 
                            <List.Content floated='right'> Select </List.Content>  
                            <List.Content> {elem}  </List.Content>  
                        </List.Item>
                    )
                }
            </List>
        )
    }

    render() {

      return (
        <div>         
            {
                this.state.loading ? null: <Loading />
            }
            {
                this.state.loading == true && this.state.wallets.length != 0 
                ?  this.renderList()
                : <Loading />
            }     
        </div>
      );
    }
  }
  
  export default Wallets;

