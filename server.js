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

var connection = new Connection(config);


function makeQuery(params){
	result = {};
	connection.on('connect', function(err) {
		if(err){
			result['error'] = err;
			//return result;
		}
	    result['connection'] = 'successful';
	    if(params.hello){
	    	console.log("hello");
	    }
	    else
	    if(params.createTable){
	    	result['tableQueryResponse'] = createTableQuery();
	    }
	    else
	    if(params.showTables){
	    	result['showTablesResponse'] = showTablesQuery();
	    }
	    else{
	    	result['queryResponse'] = 'no query done'
	    }
	    return result;
	});
}


var port = process.env.PORT || 1337;
http.createServer(function(req,res) {
	if(req.method == "GET"){
		var params = qs.parse(url.parse(req.url).query);
		var result = {};
		result.queryResponse = makeQuery(params);
		res.writeHead({'Content-Type':'text/html'});
		res.write("result --- "+JSON.stringify(result));
		//res.write("result --- ");
		
		res.end();
	}
	else
	if(req.method == "POST"){
		res.writeHead(404,{'Content-Type':'text/html'});
		res.write(' '+req.url+'<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
      	res.end();
	}
}).listen(port);
console.log("Server running on port 1337");






var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function createTableQuery() {
    request = new Request("CREATE TABLE Persons(PersonID int,LastName varchar(255),FirstName varchar(255),Address varchar(255),City varchar(255));", function(err) {
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

function showTablesQuery() {
    request = new Request("SHOW tables", function(err) {
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
