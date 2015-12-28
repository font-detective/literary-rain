var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");

function getFilePath(font) {
	return './output/' + font + '/';
}

function makeFileDir(font, callback) {
	var path = getFilePath(font);
	fs.exists(path, function (exists) {
		if (!exists) {
			fs.mkdirSync(path);
		}
		callback();
	});
}

function writeFileSequential(font, data, i) {
	var i = i || 0;
    var fileName = getFilePath(font) + 'out_' + i + '.png';
    fs.exists(fileName, function (exists) {
    	if (exists) {
    		writeFileSequential(font, data, ++i);
    	} else {
    		makeFileDir(font, function() {
	    		fs.writeFile(fileName, data, 'base64', function(err) {
					if (err) {
						console.error(err);	
					}
				});
    		});
    	}
    });
};

function writeFileRandom(font, data) {
	// Space for 1m files
	var i = Math.floor(Math.random() * 999999);
	var fileName = getFilePath(font) + 'out_' + i + '.png';
	makeFileDir(font, function() {
		fs.writeFile(fileName, data, 'base64', function(err) {
			if (err) {
				console.error(err);	
			}
		});
	});
}

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.post('/upload/:font', function (req, res) {
	var font = req.params.font;
	var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
	writeFileRandom(font, base64Data);
})

app.use(function (req, res) {
	res.sendFile('./public/lr.html', { root : __dirname});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Literary Rain listening at http://%s:%s', host, port);
});
