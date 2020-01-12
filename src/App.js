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
    this.myPredict();
  }

  async myPredict() {
    // const model = await tf.loadLayersModel('C:/Users/Sean/polinp/ml/js/model.json');
    const model = await tf.loadLayersModel({"format": "layers-model", "generatedBy": "keras v2.2.4-tf", "convertedBy": "TensorFlow.js Converter v1.4.0", "modelTopology": {"keras_version": "2.2.4-tf", "backend": "tensorflow", "model_config": {"class_name": "Sequential", "config": {"name": "sequential", "layers": [{"class_name": "Embedding", "config": {"name": "embedding", "trainable": true, "batch_input_shape": [null, null], "dtype": "float32", "input_dim": 44000, "output_dim": 32, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}}, "embeddings_regularizer": null, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}}, {"class_name": "GlobalAveragePooling1D", "config": {"name": "global_average_pooling1d", "trainable": true, "dtype": "float32", "data_format": "channels_last"}}, {"class_name": "Dense", "config": {"name": "dense", "trainable": true, "dtype": "float32", "units": 32, "activation": "relu", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}}, "bias_initializer": {"class_name": "Zeros", "config": {}}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null}}, {"class_name": "Dense", "config": {"name": "dense_1", "trainable": true, "dtype": "float32", "units": 1, "activation": "sigmoid", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}}, "bias_initializer": {"class_name": "Zeros", "config": {}}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null}}]}}, "training_config": {"loss": "binary_crossentropy", "metrics": ["accuracy"], "weighted_metrics": null, "sample_weight_mode": null, "loss_weights": null, "optimizer_config": {"class_name": "Adam", "config": {"name": "Adam", "learning_rate": 0.0010000000474974513, "decay": 0.0, "beta_1": 0.8999999761581421, "beta_2": 0.9990000128746033, "epsilon": 1e-07, "amsgrad": false}}}}, "weightsManifest": [{"paths": ["group1-shard1of2.bin", "group1-shard2of2.bin"], "weights": [{"name": "dense/kernel", "shape": [32, 32], "dtype": "float32"}, {"name": "dense/bias", "shape": [32], "dtype": "float32"}, {"name": "dense_1/kernel", "shape": [32, 1], "dtype": "float32"}, {"name": "dense_1/bias", "shape": [1], "dtype": "float32"}, {"name": "embedding/embeddings", "shape": [44000, 32], "dtype": "float32"}]}]});

    let res = model.predict(tf.tensor1d(["Liberal"]));
    console.log(res)
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
            <h3 className="mt-2 text-center"><a href={this.state.userArticle}>{this.state.userArticle}</a></h3>
          </div>

          <div className="card col-lg-12 bias neutral">
            <h3 className="mt-2">{this.state.biasUser}</h3>
          </div>
        </div>

        <div className="slidecontainer">
        <input type="range" min="1" max="100" value={this.state.biasUser} className="slider" id="myRange" readOnly={true} />
        </div>

        <div className="col-lg-12 text-center">
          <h3 className="mt-5">Our suggested reading:</h3>

          <div className="card col-lg-12 topic ">
          <h3 className="mt-2 text-center"><a href={this.state.links[1]}>{this.state.links[1]}</a></h3>
          </div>

          <div className="card col-lg-12 bias neutral">
            <h3 className="mt-2">{this.state.bias1}</h3>
          </div>
        </div>

        <div className="slidecontainer">
        <input type="range" min="1" max="100" value={this.state.bias1} className="slider" id="myRange" readOnly={true} />
        </div>

        <div className="col-lg-12 text-center">
          <h3 className="mt-5">Our suggested reading:</h3>

          <div className="card col-lg-12 topic ">
            <h3 className="mt-2 text-center"><a href={this.state.links[2]}>{this.state.links[2]}</a></h3>
          </div>

          <div className="card col-lg-12 bias neutral">
            <h3 className="mt-2">{this.state.bias2}</h3>
          </div>
        </div>

        <div className="slidecontainer">
        <input type="range" min="1" max="100" value={this.state.bias2} className="slider" id="myRange" readOnly={true} />
        </div>

        <div className="col-lg-12 text-center">
        <h3 className="mt-5">Other links</h3>
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

