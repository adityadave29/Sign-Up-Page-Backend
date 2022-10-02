const express = require('express');
const https = require('https');
const BodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(BodyParser.urlencoded({ extended: true }));


app.post("/", (req, res) => {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.mail;
    // console.log(firstname, lastname, email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/14c6736aff"

    const options = {
        method: "POST",
        auth: "aditya29:e72b86f0530212c906c74e7057d1eb4c-us17"
    }
    
    const request = https.request(url,options,(response) => {

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/fail.html");
        }

        response.on("data",(data) => {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.listen(8000, () => {
    console.log("Server On !");
})

/*
API Key:
e72b86f0530212c906c74e7057d1eb4c-us17

Id:
14c6736aff
*/