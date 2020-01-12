
let request = require('request');
let https = require('https');
let subscriptionKey = "9520ea125c71429e80daf1e765e5552e";
let host = "unbiased-nwhacks2020.cognitiveservices.azure.com"
let path = '/bing/v7.0/news/search';
// todo
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
      for (var article in body) {
          console.log(article.description)
      }
    //   console.log('\nJSON Response:\n');
    //   console.log(body);
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

