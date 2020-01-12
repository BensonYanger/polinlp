import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import './App.css';


export default class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.scrapePage = this.scrapePage.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      userInputText: "No info yet",
      userArticle: ""
    }
    
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  scrapePage() {
    console.log("scrape out")
    fetch("https://api.diffbot.com/v3/article?token=b7fd8288de04076dd92b31bb7cb9d857&url=" + this.state.userArticle)
        .then(res => res.json())
        .then(
          (result) => {
            // console.log(result.objects[0].text);
            // console.log(this.state.userArticle)
            this.setState((state) => {
              return {userInputText: result.objects[0].text}
            });
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
            <Form.Control name="userArticle" value={this.state.userArticle} onChange={this.handleChange} placeholder="News Article" />
            <Form.Text className="text-muted">
              We will scrape the article text
            </Form.Text>
          </Form.Group>

          <Button variant="primary" onClick={this.scrapePage}>
            Submit
          </Button>
        </Form>

        <div>{this.state.userInputText}</div>

      </div>
    </div>
  </div>
  );
}


}

