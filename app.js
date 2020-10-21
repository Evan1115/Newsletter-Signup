const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/", function (req, res) {

    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;

   
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);
    const url = "https://us2.api.mailchimp.com/3.0/lists/1a878360b0";

    const options = {
        method: "POST",
        auth: "joram:276a17eed4670637230280d5966c5c14-us2"
    }

    const request = https.request(url, options, function (response) {
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("server is running on port 3000...");
});

//API Key
//276a17eed4670637230280d5966c5c14-us2

//List ID
//1a878360b0

/*

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);
    const url = "https://us2.api.mailchimp.com/3.0/lists/1a878360b0";

    const options = {
        method: "POST",
        auth: "joram:276a17eed4670637230280d5966c5c14-us2"
    }

    const request = https.request(url, options, function (response) {
    
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();

*/