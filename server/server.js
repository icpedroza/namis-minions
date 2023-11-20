const express = require('express');
const config = require('./config.json');
const routes = require('./routes');

const app = express();

app.get('/test', routes.test);

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});