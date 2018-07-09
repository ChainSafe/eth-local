import React, { Component } from 'react'
import { Button, Checkbox, Form, List } from 'semantic-ui-react'
import axios from 'axios';
import Loading from './Loading';

const styles = {
    text : {
        color: 'black',
        padding: 15
    }, 
    mainContainer : {
      paddingTop: 30
    }
}

class Wallets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wallets: [],
            loading: false,
            selectedWallet: ""
        }
    }

    componentDidMount = () => {      
        var result = this.getWallets();
        result.then((resultData) => {
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

    handleClick = (x) => {
        console.log(x);
        this.setState({ selectedWallet: x })
        this.props.selectWallet(x);
        this.props.formChanged();
    };

    renderList() {
    
        var listItems = [];

         for(var key in this.state.wallets) {       
            listItems.push( {"key":key, "address": this.state.wallets[key].split(" - ")[1]} );          
         }

        return (
            <List >                     
                {
                    listItems.map((elem) =>  
                        <List.Item style={styles.text} key={elem.address}> 
                            <List.Content floated='right'> 
                                <Button onClick={() => this.handleClick(elem.address)} > Select </Button>
                            </List.Content>  
                            <List.Content> {elem.key}  </List.Content>  
                        </List.Item>
                    )
                }
            </List>
        )
    }

    render() {

      return (
        <div style={styles.mainContainer}>         
            {
                this.state.loading ? <h3 style={styles.text}>Choose A Wallet For Payment</h3> : <Loading />
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

