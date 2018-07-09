import React, { Component } from 'react'
import { Button, Checkbox, Form, Header, Container, Icon } from 'semantic-ui-react'

const styles = {
    text : {
        color: 'black'
    }, 
    mainContainer : {
      paddingTop: 30
    }
}
class InitialForm extends Component {

      constructor(props) {
      super(props);
      this.state = {
        to: "",
        value: ""
      }
  }

  updateTo(event) {
    this.setState({to: event.target.value})
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
    this.props.changeTo(this.state.to);
    this.props.changeValue(this.state.value);
    this.props.formChanged();
  }

    render() {
      return (
        <div style={styles.mainContainer}>
          <Container text>
            <Header
              as='h3'
              content='Initiate Payment'
              inverted
              style={{
                fontSize: '2em',
                fontWeight: 'normal',
                marginBottom: 0,               
                color: 'black'
              }}
            />
            <Header
              as='h4'
              content='Choose who and how much you want to pay.'
              inverted
              style={{
                fontSize:  '1.5em',
                fontWeight: 'normal',                
                color: 'black',
                paddingBottom: '20px'

              }}
            />          

            <Form>
              <Form.Field>
              {/* <label style={styles.text} >To</label> */}
              <input     
                  value={this.state.to}
                  placeholder='Recipient Address' 
                  onChange={this.updateTo.bind(this)}
              />
              </Form.Field>
              <Form.Field>
              {/* <label style={styles.text}>Value</label> */}
              <input 
                  placeholder='Enter Ether Amount' 
                  value={this.state.value}
                  onChange={this.updateValue.bind(this)}
              />
              </Form.Field>
              <Button onClick={()=> this.sendTransactionDetails()}>Confirm</Button>            
          </Form>

          </Container>


 
        </div>
      );
    }
  }
  
  export default InitialForm;