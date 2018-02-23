var express = require('express');
var app = express();

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function timestampToNatural(timestamp) {
    var dateObj = new Date(timestamp);
    var dateString = months[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear();
    return dateString;
}

function naturalToTimestamp(natural) {
    var dateObj = new Date(natural)
    return dateObj.getTime() / 1000;
}

app.get("/:input", function(req, res) {
    var returnObj;
    if (isNaN(req.params.input)) {
        returnObj = {
            unix: naturalToTimestamp(req.params.input),
            natural: req.params.input
        }
    } else {
        returnObj = {
          unix: Number(req.params.input),
          natural: timestampToNatural(Number(req.params.input))
        }
    }

    res.send(returnObj)
})

app.get("/", function(req, res) {
    res.send("Hello! This is the timestamp microservice!")
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!")
})
