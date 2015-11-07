var http = require('http');
//var qs = require('query-string');
//var url = require('url');


var port = process.env.PORT || 1337;
http.createServer(function(req,res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end('Hello World\n');

}).listen(port);
console.log('Server running at http://localhost:8080');

