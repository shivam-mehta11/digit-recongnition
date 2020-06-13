var express = require('express');
var app = express();
var port = 3000|| process.env.PORT;

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "digitclassifier.html" );
})

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
