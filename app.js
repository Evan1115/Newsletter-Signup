const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.post("/", function (req, res) {

    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var email = req.body.email;

    console.log(fname,lname,email);

});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, function (req, res) {
    console.log("server is running on port 3000...");
});