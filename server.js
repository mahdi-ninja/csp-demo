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
  res.header('Content-Security-Policy',
    `default-src 'self'; ` + 
    `script-src 'self' 'sha256-sVC5W86Po3UWU/eNV3Aavn0GcDA/HSloLRgb7iwNe6Y=' https://code.jquery.com https://maxcdn.bootstrapcdn.com; ` + 
    `style-src https://maxcdn.bootstrapcdn.com; ` + 
    `font-src https://maxcdn.bootstrapcdn.com; ` +
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
