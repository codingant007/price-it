var http = require('http');
var https = require('https');


http.createServer(function(req,res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end('Hello World\n');

}).listen(8080,'localhost');
console.log('Server running at http://localhost:8080');
