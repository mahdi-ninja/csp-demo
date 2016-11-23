const port = 3000;

const express = require('express');  
const app = express();
const bodyParser = require('body-parser')
const handlebars  = require('express-handlebars');
app.engine('handlebars', handlebars({}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json({type: ['application/json', 'application/csp-report']}));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('static'));

var comments = [];
var reports = []; 

app.get('/', (req, res) => {
  res.header('Content-Security-Policy-Report-Only',
    `default-src 'self'; ` + 
    `report-uri /reportcsp`);
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

app.post('/reportcsp', (req, res) => {
  reports.unshift(req.body['csp-report']);
  res.end();
});

app.get('/reports', (req, res) => {
  res.render('reports', { reports: reports });
});

app.listen(port, (err) => {  
  console.log(err || `server is listening on ${port}`);
});
