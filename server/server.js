import express from 'express';
import config from './config';
import routes from './routes';

const app = express();

app.get('/test', routes.test);

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});