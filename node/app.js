


var express = require('express');
var app = express();
var http = require('http');
var request = require("request");
var MongoClient = require('mongodb').MongoClient;


var congressNumber = '113';
var version = 'v3';
var chamber = 'senate';
var apiKey = '09373818ca6661316b7b4fc325c569fd:6:69165979';

var url = 'http://api.nytimes.com/svc/politics/'+ version + '/us/legislative/congress/'+ congressNumber + '/' + chamber + '/' +
'members.json?api-key='+apiKey;

var data;


request({
	url: url,
	json: true,
	},
		function(error, response, body){
 			if (!error && response.statusCode === 200) {
        		data = body['results'][0]['members']; // Print the json response
        		MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
				  if(!err) {
				    console.log("We are connected");
				     var collection = db.collection('test');
				     collection.insert(data, {w:1}, function(err, result) {
				     	if(!err){console.log('congress data inserted')}
				     });

				  }
				});
        	}
  		})
 

app.get('/', function (req,res){});
//console.log(url);

app.listen(3000);