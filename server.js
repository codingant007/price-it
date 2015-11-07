var http = require('http');
var qs = require('query-string');
var url = require('url');

var Connection = require('tedious').Connection;
var config = {
    userName: 'fsociety',
    password: 'HelloWorld1',
    server: 'c0pmp50v6q.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'geoprix'}
};

var port = process.env.PORT || 1337;
http.createServer(function(req,res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end('Hello World\n');

}).listen(port);
console.log('Server running at http://localhost:8080');

