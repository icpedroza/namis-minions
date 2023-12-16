

const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const routes = require('./routes');
const { auth } = require('express-openid-connect');

const app = express();

// // OpenID Connect configuration
// const authConfig = {
//   authRequired: true,
//   auth0Logout: true,
//   secret: 'y3rBxtkaQTdumpQVcxfoqn7IK5Rb0oG4EfS0jxpd9ck95q7oTlnPH0AFNOiCA7Pj',
//   baseURL: 'http://localhost:3000',
//   clientID: 'cqHqQQw1o0kYfmRXJnOGUFQXyffe5PKJ',
//   issuerBaseURL: 'https://dev-hytlp1znv5tv84fc.us.auth0.com'
// };

app.use(cors({
    origin: '*',
}));

app.use(express.json());

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(authConfig));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   });

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

app.post('/openai/completion', routes.openaiCompletion);
app.post('/custom_query', routes.custom_query);

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});
