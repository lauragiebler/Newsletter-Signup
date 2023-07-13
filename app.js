const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

var mykey = config.API_KEY;
 
var secretkey = config.LIST_KEY;

const app = express();
const port = 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/" + LIST_KEY

    const options = {
        method: "POST",
        auth: "lgiebler:" + API_KEY
    }

    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/sucess.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })


    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req,res) {
    res.redirect("/")
})





app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));

