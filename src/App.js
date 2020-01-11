import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import './App.css';


export default class App extends Component {

  constructor(props, context) {
    super(props, context);
  
     //initial states, show is for modals, open is for the collapsers
    this.state = {
      // userInputText = "Undefined"
    }
    
  }

  scrapePage() {
    console.log("scrape out")
    fetch("https://api.diffbot.com/v3/article?token=b7fd8288de04076dd92b31bb7cb9d857&url=https://www.washingtonpost.com/opinions/dont-let-doma-fool-you--the-supreme-court-is-restricting-your-rights/2013/06/28/cd0afa1c-de85-11e2-b94a-452948b95ca8_story.html")
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result.objects[0].text);
          }
        )
  }

  render() {

  return (
    <div className="container">
    <div className="row">
      <div className="col-lg-12 text-center">
        <h1 className="mt-5">A Web App for Eliminating Bias</h1>
        <p className="lead">To start, enter the url of a news article</p>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>URL</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We will scrape the article text
            </Form.Text>
          </Form.Group>

          <Button variant="primary" onClick={this.scrapePage}>
            Submit
          </Button>
        </Form>

        <

      </div>
    </div>
  </div>
  );
}


}

