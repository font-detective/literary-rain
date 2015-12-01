var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/upload', function (req, res) {
	var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");

	require("fs").writeFile("./output/out.png", base64Data, 'base64', function(err) {
		if (err) {
			console.error(err);	
		}
	});
})

app.use(function (req, res) {
	res.sendFile('./public/lr.html', { root : __dirname});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Literary Rain listening at http://%s:%s', host, port);
});
