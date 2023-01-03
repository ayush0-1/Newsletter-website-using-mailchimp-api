const express = require("express");
const request = require("request");
const bodyParser = require ("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true }));


app.post("/" , function(req , res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email ,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,

        }
      }
    ]
  }
var jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/7efbd6572a";

const options = {
  method: "POST",
  auth: "ayush:c85b54fe4c6642061267c057b21a232b-us21"
}

  const request = https.request(url , options, function(response){

  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }
  else{
    res.sendfile(__dirname +"/failure.html");

  }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

});

app.post("/failure" , function(req , res){
  res.redirect("/")
});

app.get("/" , function(req , res){
  res.sendFile(__dirname +"/signup.html");
});


app.listen(3000 , function(){
  console.log("server is runnig on port 3000");
}) ;



// c85b54fe4c6642061267c057b21a232b-us21

// 7efbd6572a.
