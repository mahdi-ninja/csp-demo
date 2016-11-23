const port = 3000;

const express = require('express');  
const app = express();
const bodyParser = require('body-parser')
const handlebars  = require('express-handlebars');
app.engine('handlebars', handlebars({}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('static'));

var comments = [];

app.get('/', (req, res) => {
  res.header('Content-Security-Policy', "default-src 'none'");
  res.render('index', { comments: comments });
});

app.post('/add', (req, res) => {
  comments.unshift({ name: req.body.name, comment: req.body.comment, time: new Date().toLocaleTimeString() });
  res.redirect('/');
});

app.get('/reset', (req, res) => {
  comments = [];
  res.redirect('/');
});

app.listen(port, (err) => {  
  console.log(err || `server is listening on ${port}`);
});
