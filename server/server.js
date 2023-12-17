// server.js is the core of the backend, starting the http server and setting up the routes.
// server.js uses the express framework.

const fs = require('fs');
const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const routes = require('./routes');
const http = require('http');
const https = require('https');

const app = express();
http
    .createServer(app)
    .listen(8080, ()=>{
	console.log('The HTTP server is running at port 8080.')
  });
https
    .createServer(
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
	app
    )
    .listen(8081, ()=>{
    console.log('The HTTPS server is running at port 8081.')
  });

app.use(cors({
    origin: '*',
}));

app.use(express.json());

app.get('/test', routes.test);
app.get('/artist_albums', routes.artist_albums);
app.get('/similar_songs', routes.similar_songs);
app.get('/happy_mood_playlist', routes.happy_mood_playlist);
app.get('/hype_playlist', routes.hype_playlist);
app.get('/music_trends', routes.music_trends);
app.get('/top_artists', routes.top_artists);
app.get('/longest_albums', routes.longest_albums);
app.get('/songs_by_length', routes.songs_by_length);
app.get('/songs_per_year', routes.songs_per_year);
app.get('/explicit_songs_per_year', routes.explicit_songs_per_year);
app.get('/clean_artists', routes.clean_artists);
app.get('/search_songs', routes.search_songs);
app.get('/album_summary_stats', routes.album_summary_stats);
app.get('/danceability_by_decade', routes.danceability_by_decade);
app.get('/high_variation_albums', routes.high_variation_albums);

app.post('/openai/completion', routes.openaiCompletion);
app.post('/custom_query', routes.custom_query);
