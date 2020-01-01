//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var emailAddress = req.body.email;
  var data = {
    members: [{
        email_address: emailAddress,
        status: "subscribed",
        merge_fields: {

          FNAME: firstName,
          LNAME: lastName

        }
      }

    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/475a577204",
    method: "POST",
    headers: {
      "Authorization": 'Hany_Soliman 34a9e840118dfe862a54d97a16025ee1-us4'
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
      console.log(error);
    } else if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
      console.log(response.statusCode);
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });


});

app.post("/failure", function(req, res){
  res.redirect("/");
});
app.listen(process.evv.PORT || 3000, function(req, res) {
  console.log("The server is running on port 3000");
});



// 475a577204

// 34a9e840118dfe862a54d97a16025ee1-us4
