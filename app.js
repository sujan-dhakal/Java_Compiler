var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
const { exec } = require('child_process');

var PORT = process.env.PORT || 3100;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.post('/run', function(req, res){
	var code = req.body.msg;
	fs.writeFile("Main.java", code, (err) => {
		if (err) console.log(err);
	});
	exec('javac Main.java', (err, stdout, stderr) => {
		if (err) {
			res.send(stderr);
			return;
		}
		exec('java Main', (err, stdout, stderr) => {
			if (err) {
				res.send(stderr);
				return;
			}
			res.send(stdout);
		});
	});
});

app.listen(PORT);