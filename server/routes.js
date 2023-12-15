const mysql = require('mysql');
const config = require('./config.json');
const { spawn } = require('child_process');
const path = require('path'); // Import the 'path' module

const test = async function(req, res) {
    res.json({content: 'this is from the server!'});
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
    let q = `
        SELECT * FROM artist_albums_songs
    `;

    const sorted = req.query.sorted;
    if (sorted) {
        q = q + `\nORDER BY total_albums DESC`;
    }

    const pageSize = req.query.page_size;
    if (pageSize) {
        q = q + `\nLIMIT ${pageSize}`;
    }

    connection.query(q, (err, data) => send_res_array(res, err, data));
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
    SELECT * FROM high_energy_songs;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const hype_playlist = async function(req, res) {
    connection.query(`
    SELECT * FROM loud_songs
    ORDER BY loudness DESC
    LIMIT 30;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const music_trends = async function(req, res) {
    connection.query(`
    SELECT * FROM yearly_trends;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const top_artists = async function(req, res) {
    let q = `
    SELECT * FROM top_artists_by_song_no
    ORDER BY total_songs DESC
    `;

    const pageSize = req.query.page_size;
    if (pageSize) {
        q += `\nLIMIT ${pageSize}`;
    }

    connection.query(q, (err, data) => send_res_array(res, err, data));
}

const longest_albums = async function(req, res) {
    connection.query(`
    SELECT album_name, total_duration / (60 * 1000) AS total_duration_minutes
    FROM top_albums_duration
    ORDER BY total_duration DESC;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const songs_by_length = async function(req, res) {
    connection.query(`
    SELECT * FROM songs_duration;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const songs_per_year = async function(req, res) {
    connection.query(`
    SELECT * FROM songs_per_year
    WHERE year <> 0;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const explicit_songs_per_year = async function(req, res) {
    connection.query(`
    SELECT * FROM explicit_songs_per_year;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const clean_artists = async function(req, res) {
    connection.query(`
    SELECT * FROM artists_no_explicit_songs
    `, (err, data) => send_res_array(res, err, data)
    );
}

// Function to handle OpenAI API request
const openaiCompletion = (req, res) => {
    const prompt = "I'm going swingdancing. Generate me a playlist"; // Define your prompt here or extract it from the request

    // Adjust the path to the worker folder and openai_worker.py
    const pythonProcess = spawn('python', [path.join(__dirname, '..', 'worker', 'openai_worker.py'), prompt]);

    pythonProcess.stdout.on('data', (data) => {
        const result = data.toString();
        res.send(result); // Send the result back to the client
    });

    pythonProcess.on('error', (error) => {
        console.error('Python script error:', error);
        res.status(500).send('Error executing Python script');
    });
};

module.exports = {
    test,
    artist_albums,
    similar_songs,
    happy_mood_playlist,
    hype_playlist,
    music_trends,
    top_artists,
    longest_albums,
    songs_by_length,
    songs_per_year,
    explicit_songs_per_year,
    clean_artists,
    openaiCompletion
}