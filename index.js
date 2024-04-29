// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

// tests
// ALTERNATIVE 1
app.get("/api/:date?", (req, res) => {
  // take parameter
  let reqString = req.params.date;

  // test 7, test 8
  // no params --> current date
  let now = new Date();

  if (!reqString) {
    res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
    return;
  }

  // Regex
  let regex1 = /^\d{4}-\d{2}-\d{2}$/; // yyyy-mm-dd
  let regex2 = /^\d+$/; // xyz...p
  let regex3 = /^\d{2}\s(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}?/; // dd month yyyy

  // handler for case regex 1 or regex 3
  // test 2, test 3
  if (reqString.match(regex1) || reqString.match(regex3)) {
    let date = new Date(reqString);

    let unix = date.getTime();
    let utc = date.toUTCString();

    res.json({
      unix: unix,
      utc: utc
    });
    return;
  }

  // handler for case 2
  // test 4
  if (reqString.match(regex2)) {
    let date = new Date(+reqString);

    let unix = +reqString;
    let utc = date.toUTCString();

    res.json({
      unix: unix,
      utc: utc
    });
    return;
  }

  // test 6
  res.json({ // invalid input date string
    'error': 'Invalid Date'
  });
});

// ALTERNATIVE 2
// // note: test 7 and test 8 work if the route is "/api/:date" not "/api/:date?"
// const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"; // check for invalid date (or should be not an object)

// app.get("/api/:date", (req, res) => {
//   // test 5 (?)
//   let date = new Date(req.params.date);
  
//   // test 4
//   // change input to number if it is an object
//   if (isInvalidDate(date)) date = new Date(+req.params.date);

//   // test 6
//   // handle invalid date string input
//   if (isInvalidDate(date)) {
//     res.json({ error: "Invalid Date" });
//     return;
//   }

//   // test 2, test 3, test 4
//   res.json({
//     unix: date.getTime(),
//     utc: date.toUTCString()
//   });
// });

// // test 7, test 8
// app.get("/api", (req, res) => {
//   res.json({
//     unix: new Date().getTime(),
//     utc: new Date().toUTCString()
//   });
// });



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
