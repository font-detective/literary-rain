var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");


function writeFile(data, i) {
	var i = i || 0;
    var fileName = './output/out_' + i + '.png';
    fs.exists(fileName, function (exists) {
    	if (exists) {
    		writeFile(data, ++i);
    	} else {
    		fs.writeFile(fileName, data, 'base64', function(err) {
				if (err) {
					console.error(err);	
				}
			});
    	}
    });
};

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.post('/upload', function (req, res) {
	var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
	writeFile(base64Data);
})

app.use(function (req, res) {
	res.sendFile('./public/lr.html', { root : __dirname});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Literary Rain listening at http://%s:%s', host, port);
});
