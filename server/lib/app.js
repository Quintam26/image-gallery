const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/error-handler');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/api/albums', (req, res) => {
    res.json([{ title: 'Example Album' }]);
});

app.use((req, res) => {
    res.sendFile('index.html', { root: '/public'} );
});

app.use(errorHandler());

module.exports = app;