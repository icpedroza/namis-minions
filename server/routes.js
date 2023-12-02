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
    SELECT artists,
        COUNT(DISTINCT album) AS total_albums,
        COUNT(name) AS total_songs
    FROM songs_temp
    GROUP BY artists;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const similar_songs = async function(req, res) {
    connection.query(`
        WITH base_song AS (
            SELECT
                danceability, energy, key, loudness, mode,
                speechiness, acousticness, instrumentalness, liveness,
                valence, tempo
            FROM songs_temp
            WHERE
                name = '${req.params.song_title}'
                AND album = '${req.params.album_title}'
                AND artists = '${req.params.artist}'
        ) 
        
        SELECT s.name, s.album, s.artists
        FROM songs_temp s, base_song b
        WHERE
            s.danceability BETWEEN b.danceability - 0.3 AND b.danceability + 0.3
            AND s.energy BETWEEN b.energy - 0.3 AND b.energy + 0.3
            AND s.key BETWEEN b.key - 0.3 AND b.key + 0.3
            AND s.loudness BETWEEN b.loudness - 0.3 AND b.loudness + 0.3
            AND s.mode BETWEEN b.mode - 0.3 AND b.mode + 0.3
            AND s.speechiness BETWEEN b.speechiness - 0.3 AND b.speechiness + 0.3
            AND s.acousticness BETWEEN b.acousticness - 0.3 AND b.acousticness + 0.3
            AND s.instrumentalness BETWEEN b.instrumentalness - 0.3 AND b.instrumentalness + 0.3
            AND s.liveness BETWEEN b.liveness - 0.3 AND b.liveness + 0.3
            AND s.valence BETWEEN b.valence - 0.3 AND b.valence + 0.3
            AND s.tempo BETWEEN b.tempo - 0.3 AND b.tempo + 0.3;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const happy_mood_playlist = async function(req, res) {
    connection.query(`
    SELECT name, album, artists
    FROM songs_temp
    WHERE
        energy >= 0.8
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
    FROM songs_temp
    ORDER BY loudness DESC
    LIMIT 30;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const music_trends = async function(req, res) {
    connection.query(`
    SELECT 
        year,
        AVG(danceability) AS avg_danceability,
        AVG(energy) AS avg_energy,
        AVG(`key`) AS avg_key,
        AVG(loudness) AS avg_loudness,
        AVG(mode) AS avg_mode,
        AVG(speechiness) AS avg_speechiness,
        AVG(acousticness) AS avg_acousticness,
        AVG(instrumentalness) AS avg_instrumentalness,
        AVG(liveness) AS avg_liveness,
        AVG(valence) AS avg_valence,
        AVG(tempo) AS avg_tempo,
        AVG(duration_ms) AS avg_duration_ms,
        AVG(explicit_True) AS avg_explicit_True
    FROM songs_temp
    GROUP BY year;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const top_artists = async function(req, res) {
    connection.query(`
    SELECT artists, COUNT(*) AS total_songs
    FROM songs_temp
    GROUP BY artists
    ORDER BY COUNT(*) DESC
    LIMIT 10;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const longest_albums = async function(req, res) {
    connection.query(`
    SELECT album, SUM(duration_ms) AS total_duration
    FROM songs_temp
    GROUP BY album
    ORDER BY total_duration DESC
    LIMIT 10;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const songs_by_length = async function(req, res) {
    connection.query(`
    SELECT ROUND(duration_ms / 60000) AS duration_minutes, COUNT(*) AS num_songs
    FROM songs_temp
    GROUP BY ROUND(duration_ms / 60000)
    ORDER BY duration_minutes;
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