const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;

// API JEY pk_1de4171d5a5945ea8e3f07657c6a1132
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_1de4171d5a5945ea8e3f07657c6a1132', { json: true }, (err, res, body) => {
	if(err){return console.log(err);}
	if (res.statusCode === 200){
		console.log(body);
	}
})	;

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is  other stuff!";

// Set handlebar routes
app.get('/', function (req, res){
	res.render('home', {
		stuff: otherstuff
	});
});

// Create about page route
app.get('/about.html', function (req, res){
	res.render('about');
});


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log("server listening on port " + PORT));