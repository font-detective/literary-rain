var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(function (req, res) {
	res.sendFile('./public/lr.html', { root : __dirname});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Literary Rain listening at http://%s:%s', host, port);
});
