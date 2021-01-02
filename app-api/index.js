const express = require('express')
const app = express();
var cors = require('cors');

app.use(cors());

app.get('/', function(req, res) {
    var data = ['Urgent', 'Regular', 'Trivial'];
    res.header('Content-Type', 'application/json');
    res.write(JSON.stringify(data));
    res.end();
})

app.listen(8081);