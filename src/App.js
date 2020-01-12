import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import './App.css';


let request = require('request');
let https = require('https');
let subscriptionKey = "9520ea125c71429e80daf1e765e5552e";
let host = "unbiased-nwhacks2020.cognitiveservices.azure.com"
let path = '/bing/v7.0/news/search';
 let term = 'trump'

 let response_handler = function (response) {
  let body = '';
  response.on('data', function (d) {
      body += d;
  });
  response.on('end', function () {
      console.log('\nRelevant Headers:\n');
      for (var header in response.headers)
          // header keys are lower-cased by Node.js
          if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
               console.log(header + ": " + response.headers[header]);
      body = JSON.stringify(JSON.parse(body), null, '  ');
    //   for (var article in body) {
    //     console.log(article);
    // }
      // console.log('\nJSON Response:\n');
      // console.log(body);
      console.log(typeof body);
  });
  response.on('error', function (e) {
      console.log('Error: ' + e.message);
  });
};

let bing_news_search = function (search) {
console.log('Searching news for: ' + term);
let request_params = {
      method : 'GET',
      hostname : host,
      path : path + '?q=' + encodeURIComponent(search),
      headers : {
          'Ocp-Apim-Subscription-Key' : subscriptionKey,
      }
  };

  let req = https.request(request_params, response_handler);
  req.end();
}
bing_news_search(term);



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
        <h1 className="mt-5 titleColor">Unbiased</h1>
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

      <div className="row">
        <div className="col-lg-12 text-center">
          <h3 className="mt-5">Your article:</h3>

          <div className="card col-lg-12 topic ">
            <h3 className="mt-2 text-center">(TOPIC)</h3>
          </div>

          <div className="card col-lg-12 bias neutral">
            <h3 className="mt-2">(BIAS)</h3>
          </div>
        </div>

        <div className="col-lg-12 text-center">
          <h3 className="mt-5">Our article:</h3>

          <div className="card col-lg-12 topic ">
            <h3 className="mt-2 text-center">(TOPIC)</h3>
          </div>

          <div className="card col-lg-12 bias neutral">
            <h3 className="mt-2">(BIAS)</h3>
          </div>
        </div>


        


      </div>
        

      </div>
    </div>
  </div>


  );
}


}

