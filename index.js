// index.js
// where your node app starts
// init project
var express = require("express");
var app = express();
var cors = require("cors");
const dotenv = require('dotenv');
//
dotenv.config();

// So that your API is remotely testable by FCC

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...

app.get("/api/", function (req, res, next) {
  let new_date = new Date();
  return res.json({ unix: new_date.valueOf(), utc: new_date.toUTCString() });
});

app.get("/api/:date", function (req, res, next) {
  let dateInMillisSecs = req.params.date;
  let unix, utc; 
  if(parseInt(dateInMillisSecs) > 10000){
    unix = new Date(parseInt(dateInMillisSecs));
    return res.json({ unix: unix.getTime(), utc: unix.toUTCString() 
   });
  }
  let passedValue = new Date(dateInMillisSecs);
  if(passedValue == "Invalid Date"){
    return res.json({ error: "Invalid Date" });
  } else {
    return res.json({
      unix: passedValue.valueOf(),
      utc: passedValue.toUTCString(),
    });
  }
});

// listen for requests :

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running at ${PORT}`));
