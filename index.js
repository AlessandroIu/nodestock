const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// Use body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API JEY pk_1de4171d5a5945ea8e3f07657c6a1132
// Create call_api function
function call_api (finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_1de4171d5a5945ea8e3f07657c6a1132', { json: true }, (err, res, body) => {
		if(err){return console.log(err);}
		if (res.statusCode === 200){
			finishedAPI(body);
		}
	});
};

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is  other stuff!";

// Set handlebar index GET route
app.get('/', function (req, res){
	call_api(function(doneAPI) {
		res.render('home', {
			stock: doneAPI
		});		
	}, "fb");
});

// Set handlebar index POST route
app.post('/', function (req, res){
	call_api(function(doneAPI) {
		res.render('home', {
			stock: doneAPI
		});		
	}, req.body.stock_ticker);
});

// Create about page route
app.get('/about.html', function (req, res){
	res.render('about');
});


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log("server listening on port " + PORT));