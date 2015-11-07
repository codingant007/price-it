var http = require('http');

var port = process.env.PORT || 1337;
http.createServer(function(req,res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end('Hello World\n');
}).listen(port);
console.log("Server running on port 1337");

var Connection = require('tedious').Connection;
var config = {
    userName: 'fsociety',
    password: 'HelloWorld1',
    server: 'c0pmp50v6q.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'AdventureWorks'}
};
var connection = new Connection(config);
connection.on('connect', function(err) {
	console.log(err);
// If no error, then good to proceed.
    console.log("Connected");
});


var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function executeStatement() {
    request = new Request("", function(err) {
    if (err) {
        console.log(err);} 
    });
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
          if (column.value === null) {
            console.log('NULL');
          } else {
            result+= column.value + " ";
          }
        });
        console.log(result);
        result ="";
    });

    request.on('done', function(rowCount, more) {
    console.log(rowCount + ' rows returned');
    });
    connection.execSql(request);
}