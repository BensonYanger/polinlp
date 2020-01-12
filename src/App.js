import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import './App.css';
import * as tf from '@tensorflow/tfjs';

export default class App extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.scrapePage = this.scrapePage.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      userInputText: "No info yet",
      userArticle: "",
      links: [],
      term: "trump",
      biasUser: 50,
      bias1: 75,
      bias2: 25,
      bias3: 50,
      bias4: 50
    }
    
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  componentDidMount() {
    this.myPredict("Liberal")
    
  }


  async myPredict(str) {
    var encode = require( 'hashcode' ).hashCode;
    const model = await tf.loadLayersModel('https://bensonyang.com/js/model.json');
    let split = str.split(" ")
    split = encode().value(split); 
    console.log(split)
    let res = model.predict(tf.tensor1d([split]));
    console.log(res)
  }

  guess(num) {
    const c = "Centric";
    const sr = "Slight Right Bias"
    const r = "Right Bias";
    const sl = "Slight Left Bias"
    const l = "Left Bias";
    if (num < 25) {
      return l
    } else if (num > 25 && num < 40) {
      return sl
    } else if (num > 40 && num < 60) {
      return c
    } else if (num > 60 && num < 75) {
      return sr 
    } else {
      return r
    }
  }

  scrapePage() {
    var element = document.getElementById("result");

    console.log("scrape out")
    fetch("https://api.diffbot.com/v3/article?token=b7fd8288de04076dd92b31bb7cb9d857&url=" + this.state.userArticle)
        .then(res => res.json())
        .then(
          (result) => {
            // console.log(result.objects[0].text);
            // console.log(this.state.userArticle)
            this.setState((state) => {
              // console.log(result)
              // console.log(result.objects[0].title)
              this.fetchResults(result.objects[0].title);
              
              return {userInputText: result.objects[0].text, term: result.objects[0].title, biasUser: Math.random() * 100,
              bias1: Math.random() * 100, bias2: Math.random() * 100}
              
            });
          }
        )
    // console.log("title updated" + this.state.term + this.state.userInputText)
    element.scrollIntoView({behavior: "smooth"});
  }

  fetchResults(str) {
    let https = require('https');
    let subscriptionKey = "9520ea125c71429e80daf1e765e5552e";
    let host = "unbiased-nwhacks2020.cognitiveservices.azure.com"
    let path = '/bing/v7.0/news/search';

    let response_handler = (response) => {
      let body = '';
      response.on('data', function (d) {
          body += d;
      });
      response.on('end', () => {
          for (var header in response.headers)
              // header keys are lower-cased by Node.js
              if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                  console.log(header + ": " + response.headers[header]);
          var values = JSON.parse(body).value;
          const urls = values.map(x => x.url + "\n");
          this.setState((prevState) => ({
            links: [...prevState.links, ...urls]
          }));
      });
      response.on('error', function (e) {
          console.log('Error: ' + e.message);
      });
    };

    let bing_news_search = (search) => {
    let request_params = {
          method : 'GET',
          hostname : host,
          path : path + '?q=' + encodeURIComponent(search) + '&count=50',
          headers : {
              'Ocp-Apim-Subscription-Key' : subscriptionKey,
          },
      };

      let req = https.request(request_params, response_handler);
      req.end();
    }

    bing_news_search(str);

  }

  render() {


  return (
    // 
    <div className="container whitespace">

    <div className="row">
      <div className="col-lg-12 text-center">
        <img src="logo.png"></img>
        <Form>
          <Form.Group controlId="formBasicEmail" style={{margin: "1em"}}>
            <Form.Label>To start, enter the url of a news article</Form.Label>
            <Form.Control name="userArticle" value={this.state.userArticle} onChange={this.handleChange} placeholder="URL of News Article" />
            <Form.Text className="text-muted">
              We will scrape the article text
            </Form.Text>
          </Form.Group>

          <Button variant="primary" onClick={this.scrapePage} style={{margin: "1em"}}>
            Submit
          </Button>
    
   
        </Form>


      <div className="row" style={{marginTop: '150vh', marginBottom:'50vh'}}>
        <div className="col-lg-12 text-center" id="result">
          <h3 className="" style={{marginBottom: "1rem"}}>Your article:</h3>

          <div className="card col-lg-12 topic ">
            <h3 className="mt-2 text-center"><a href={this.state.userArticle}>{this.state.userArticle}</a></h3>
          </div>

          <div className="card col-lg-12 bias neutral">
            <h3 className="mt-2">{this.guess(this.state.biasUser)}</h3>
          </div>
        </div>

        <div className="slidecontainer" style={{marginBottom: "2rem"}}>
        <input type="range" min="1" max="100" value={this.state.biasUser} className="slider" id="myRange" readOnly={true} />
        </div>

        <div className="col-lg-12 text-center mt3">
          <h3 className="mt-5" style={{marginBottom: "1rem"}}>Our suggested reading:</h3>

          <div className="card col-lg-12 topic ">
          <h3 className="mt-2 text-center"><a href={this.state.links[1]}>{this.state.links[1]}</a></h3>
          </div>

          <div className="card col-lg-12 bias neutral">
            <h3 className="mt-2">{this.guess(this.state.bias1)}</h3>
          </div>
        </div>

        <div className="slidecontainer" style={{marginBottom: "2rem"}}>
        <input type="range" min="1" max="100" value={this.state.bias1} className="slider" id="myRange" readOnly={true} />
        </div>

        <div className="col-lg-12 text-center">
          <h3 className="mt-5" style={{marginBottom: "1rem"}}>Our suggested reading:</h3>

          <div className="card col-lg-12 topic ">
            <h3 className="mt-2 text-center"><a href={this.state.links[2]}>{this.state.links[2]}</a></h3>
          </div>

          <div className="card col-lg-12 bias neutral">
            <h3 className="mt-2">{this.guess(this.state.bias2)}</h3>
          </div>
        </div>

        <div className="slidecontainer" style={{marginBottom: "2rem"}}>
        <input type="range" min="1" max="100" value={this.state.bias2} className="slider" id="myRange" readOnly={true} />
        </div>

        <div className="col-lg-12 text-center">
        <h3 className="mt-5">Other links:</h3>
        <div>{this.state.links.map(link => (
            <li key={link}><a href={link}>{link}</a></li>
          ))}</div>
        </div>

      </div>
        

      </div>
    </div>
  </div>


  );
}


}

