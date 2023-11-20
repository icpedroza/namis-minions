const mysql = require('mysql');
const config = require('./config.json');

const test = async function(req, res) {
    res.send(`this is from the server!`);
};

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect((err) => err && console.log(err));

const send_res_obj = function(res, err, data) {
    if (err || data.length === 0) {
        console.log(err);
        res.json({});
    } else {
        res.json(data);
    }
}

const send_res_array = function(res, err, data) {
    if (err || data.length === 0) {
        console.log(err);
        res.json([]);
    } else {
        res.json(data);
    }
}

const artist_albums = async function(req, res) {
    connection.query(`
    SELECT artists, album, name, 
       COUNT(name) AS total_songs, 
       COUNT(album) AS total_album
    FROM df
    GROUP BY artists, album, name;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const similar_songs = async function(req, res) {
    connection.query(`
    WITH base_song AS (
        SELECT danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo
        FROM df
        WHERE name = '${req.params.song_title}' AND album = '${req.params.album_title}' and artists = '${req.params.artist}'
    ) 

    SELECT name, album, artists
    FROM df
    WHERE
    danceability <= base_song.danceability + 0.3 
    AND danceability >= base_song.danceability - 0.3

    AND energy <= base_song.energy + 0.3 
    AND energy >= base_song.energy - 0.3

    AND key <= base_song.key + 0.3 
    AND key >= base_song.key - 0.3

    AND loudness <= base_song.loudness + 0.3 
    AND loudness >= base_song.loudness - 0.3

    AND mode <= base_song.mode + 0.3 
    AND mode >= base_song.mode - 0.3

    AND speechiness <= base_song.speechiness + 0.3 
    AND speechiness >= base_song.speechiness - 0.3

    AND acousticness <= base_song.acousticness + 0.3 
    AND acousticness >= base_song.acousticness - 0.3

    AND Instrumentalness <= base_song.Instrumentalness + 0.3 
    AND Instrumentalness >= base_song.Instrumentalness - 0.3

    AND liveness <= base_song.liveness + 0.3 
    AND liveness >= base_song.liveness - 0.3

    AND valence <= base_song.valence + 0.3 
    AND valence >= base_song.valence - 0.3

    AND tempo <= base_song.tempo + 0.3 
    AND tempo >= base_song.tempo - 0.3;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const happy_mood_playlist = async function(req, res) {
    connection.query(`
    SELECT name, album, artists
    FROM df
    WHERE
    AND energy >= 0.8
    AND mode >= 0.3
    AND liveness >= 0.8
    AND valence >= 0.8
    AND tempo >= 140;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const hype_playlist = async function(req, res) {
    connection.query(`
    SELECT name, album, artists, loudness
    FROM df
    ORDER BY loudness DESC
    LIMIT 30;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const music_trends = async function(req, res) {
    connection.query(`
    SELECT year, AVG(id), AVG(name), AVG(album), AVG(album_id), AVG(artists), AVG(artist_ids), AVG(track_number), AVG(disc_number), AVG(danceability), AVG(energy), AVG(key), AVG(loudness), AVG(mode), AVG(speechiness), AVG(acousticness), AVG(instrumentalness), AVG(liveness), AVG(valence), AVG(tempo), AVG(duration_ms), AVG(time_signature), AVG(release_date), AVG(explicit_True)
    FROM df
    GROUP BY year
    `, (err, data) => send_res_array(res, err, data)
    );
}

const top_artists = async function(req, res) {
    connection.query(`
    SELECT artists, COUNT(*) AS total_songs
    FROM df
    GROUP BY artists
    ORDER BY total_songs DESC
    LIMIT 10; 
    `, (err, data) => send_res_array(res, err, data)
    );
}

const longest_albums = async function(req, res) {
    connection.query(`
    SELECT album, SUM(duration_ms) AS total_duration
    FROM df
    GROUP BY album
    ORDER BY total_duration DESC
    LIMIT 10;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const songs_by_length = async function(req, res) {
    connection.query(`
    SELECT ROUND(duration_ms / 60000) AS duration_minutes, COUNT(*) AS num_songs
    FROM df
    GROUP BY ROUND(duration_ms / 60000) 
    ORDER BY ROUND(duration_ms / 60000); 
    `, (err, data) => send_res_array(res, err, data)
    );
}

module.exports = {
    test,
    artist_albums,
    similar_songs,
    happy_mood_playlist,
    hype_playlist,
    music_trends,
    top_artists,
    longest_albums,
    songs_by_length
}