// server.js
// where your node app starts

// init project
var myApp=require('./myApp');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string",function(req,res){
  console.log(req.params.date_string);
  
  let dateString=req.params.date_string;
  let date;
  if(dateString===''){
    date=new Date();
  }else{
    date=new Date(dateString);
    if(date=='Invalid Date'){
      dateString=parseInt(dateString);
      console.log(typeof dateString);
      date=new Date(dateString);
      if(date=='Invalid Date'){
        res.json({"error" : "Invalid Date" });
        return;
      }
    }
  }
  let unixTime=date.getTime();
  let unixString=date.toUTCString();
  
  res.json({"unix": unixTime, "utc" : unixString });  
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});