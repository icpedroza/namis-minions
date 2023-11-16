const express = require('express');
const conf = require('./config');
const routes = require('./routes');

const app = express();

app.get('/test', routes.test);

app.listen(conf.server_port, () => {
    console.log(`Server running at http://${conf.server_host}:${conf.server_port}/`)
});