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
    var element = document.getElementById("result");

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
    element.scrollIntoView({behavior: "smooth"});
    
  }

  render() {
    // var slider = document.getElementById("myRange");
    // var output = document.getElementById("demo");
    // output.innerHTML = slider.value; // Display the default slider value
    
    // // Update the current slider value (each time you drag the slider handle)
    // slider.oninput = function() {
    //   output.innerHTML = this.value;
    // }

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

      <div className="row" style={{marginTop: '150vh', marginBottom:'50vh'}}>
        <div className="col-lg-12 text-center" id="result">
          <h3 className="">Your article:</h3>

          <div className="card col-lg-12 topic ">
            <h3 className="mt-2 text-center">(TOPIC)</h3>
          </div>

          <div className="card col-lg-12 bias neutral">
            <h3 className="mt-2">(BIAS)</h3>
          </div>
        </div>

        <div className="slidecontainer">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
        </div>

        <div className="col-lg-12 text-center">
          <h3 className="mt-5">Our suggested reading:</h3>

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

