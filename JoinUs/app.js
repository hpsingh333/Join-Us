var express = require('express');
var app = express();
var mysql = require('mysql');
var faker = require('faker');
var bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

app.set('view engine', 'ejs');

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'join_us',
});

app.get('/', function (req, res) {
	var q = 'SELECT COUNT(*) as count FROM users';
	connection.query(q, function (error, results) {
		if (error) throw error;
		var count = results[0].count;
		res.render('home', { count: count });
	});
});

app.post('/register', function (req, res) {
	const emailRegexp =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	var person = {
		email: req.body.email,
	};
	if (emailRegexp.test(person.email)) {
		connection.query(
			'INSERT INTO users SET ?',
			person,
			function (err, results, fields) {
				if (err) throw err;
				res.redirect('/');
			}
		);
	} else {
		res.render('wrong_email');
	}
});

app.listen(333, function () {
	console.log('App listening on port 333!');
});
