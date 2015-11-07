var http = require('http');
var https = require('https');

var port = process.env.PORT || 8080;

http.createServer(function(req,res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end('Hello World\n');
}).listen(port);
console.log('Server running at http://localhost:8080');
