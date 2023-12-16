const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const routes = require('./routes');

const app = express();
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

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});