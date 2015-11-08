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
var rslt = '';
var connection = new Connection(config);
connection.on('connect', function(err) {
       if(err){
           rslt = JSON.stringify(err);
        }
    });
var port = process.env.PORT || 1337;
http.createServer(function(req,res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	createTableQuery(res);
	//res.end('hello!');

}).listen(port);
console.log('Server running at http://localhost:8080');

function createTableQuery(res) {
	res.write("initializing request\n");
    request = new Request("CREATE TABLE Persons(PersonID int,LastName varchar(255),FirstName varchar(255),Address varchar(255),City varchar(255));", function(err) {
    res.end('the end');
    if (err) {
    	res.write(JSON.stringify(err));
    	res.end();
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
        res.write(result);
        result ="";
    });

    request.on('done', function(rowCount, more) {
    	res.write(' ' + rowCount + ' rows returned');
    	console.log(rowCount + ' rows returned');
    	res.end('Hello World \n' + rslt + ' good');
    });
    connection.execSql(request);
}