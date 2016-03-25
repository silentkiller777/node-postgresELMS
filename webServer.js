var pg = require("pg")
var http = require( "http")
var port = 5433;
var host = '127.0.0.1';
var conString = "pg://postgres:sukrit@localhost:5432/employees";
	var client = new pg.Client(conString);
	
	client.connect();
var server = http.createServer(function(req,res) {

	
	//METHODS TO BE USED
		if(req.method == 'POST') {
			insert_records(req,res);
		}
		else if(req.method == 'GET') {
			list_records(req,res);
		}
		else if(req.method == 'PUT') {
			update_record(req,res);
		}
		else if(req.method == 'DELETE') {
			delete_record(req,res);
		}
		
}).listen(port,host);
console.log("Connected to " + port + " " + host);

var update_record = function(req,res) {
	var query = client.query("UPDATE emps set firstname = 'suki' WHERE firstname= 'sukrit' AND lastname = 'd'");
	query.on("row", function (row,result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		console.log(JSON.stringify(result.rows, null, "    "));
		res.writeHead(200, {'Content-Type' : 'text/plain'});
		res.write(JSON.stringify(result.rows) + "\n");
		res.end();
	});
};

var delete_record = function(req,res) {
	var query = client.query("DELETE FROM emps WHERE lastname = 'd'");
	query.on("row", function (row,result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		console.log(JSON.stringify(result.rows, null, "    "));
		res.writeHead(200, {'Content-Type' : 'text/plain'});
		res.write(JSON.stringify(result.rows) + "\n");
		res.end();
	});
};

var list_records = function(req,res) {
	console.log("Listing records");
	var query = client.query("SELECT firstname, lastname FROM emps ORDER by lastname,firstname");
	query.on("row", function(row, result){
		result.addRow(row);
	});
	query.on("row", function (row,result) {
		result.addRow(row);
	});
	query.on("end", function (result) {
		console.log(JSON.stringify(result.rows, null, "    "));
		res.writeHead(200, {'Content-Type' : 'text/plain'});
		res.write(JSON.stringify(result.rows) + "\n");
		res.end();
	});
};

var insert_records = function(req,res) {
	var query = client.query("DROP TABLE IF EXISTS emps");
	client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64),lastname varchar(64))");
	client.query("INSERT INTO emps(firstname,lastname)  VALUES ($1,$2);",['prashant','s']);
	client.query("INSERT INTO emps(firstname,lastname)  VALUES ($1,$2);",['sukrit','d']);
	query.on("end", function(result) {
		console.log("Added successfully");
	});
		
};