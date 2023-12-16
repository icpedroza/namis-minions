const mysql = require('mysql');
const config = require('./config.json');
const { spawn } = require('child_process');
const path = require('path'); // Import the 'path' module

const test = async function (req, res) {
    res.json({ content: 'this is from the server!' });
};

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect((err) => err && console.log(err));

const send_res_obj = function (res, err, data) {
    if (err || data.length === 0) {
        console.log(err);
        res.json({});
    } else {
        res.json(data);
    }
}

const send_res_array = function (res, err, data) {
    if (err || data.length === 0) {
        console.log(err);
        res.json([]);
    } else {
        res.json(data);
    }
}

const artist_albums = async function (req, res) {
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

const similar_songs = async function (req, res) {
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

const happy_mood_playlist = async function (req, res) {
    connection.query(`
    SELECT * FROM high_energy_songs;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const hype_playlist = async function (req, res) {
    connection.query(`
    SELECT * FROM loud_songs
    ORDER BY loudness DESC
    LIMIT 30;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const music_trends = async function (req, res) {
    connection.query(`
    SELECT * FROM yearly_trends;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const top_artists = async function (req, res) {
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

const longest_albums = async function (req, res) {
    connection.query(`
    SELECT album_name, total_duration / (60 * 1000) AS total_duration_minutes
    FROM top_albums_duration
    ORDER BY total_duration DESC;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const songs_by_length = async function (req, res) {
    connection.query(`
    SELECT * FROM songs_duration;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const songs_per_year = async function (req, res) {
    connection.query(`
    SELECT * FROM songs_per_year
    WHERE year <> 0;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const explicit_songs_per_year = async function (req, res) {
    connection.query(`
    SELECT * FROM explicit_songs_per_year;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const clean_artists = async function (req, res) {
    connection.query(`
    SELECT * FROM artists_no_explicit_songs
    `, (err, data) => send_res_array(res, err, data)
    );
}

const search_songs = async function (req, res) {
    const title = req.query.title ?? '';
    const duration_low = req.query.duration_low ?? 60;
    const duration_high = req.query.duration_high ?? 660;
    const danceability_low = req.query.danceability_low ?? 0;
    const danceability_high = req.query.danceability_high ?? 1;
    const energy_low = req.query.energy_low ?? 0;
    const energy_high = req.query.energy_high ?? 1;
    const valence_low = req.query.valence_low ?? 0;
    const valence_high = req.query.valence_high ?? 1;
    const speechiness_low = req.query.speechiness_low ?? 0;
    const speechiness_high = req.query.speechiness_high ?? 0;
    const acousticness_low = req.query.acousticness_low ?? 0;
    const acousticness_high = req.query.acousticness_high ?? 0;
    const instrumentalness_low = req.query.instrumentalness_low ?? 0;
    const instrumentalness_high = req.query.instrumentalness_high ?? 0;
    const liveness_low = req.query.liveness_low ?? 0;
    const liveness_high = req.query.liveness_high ?? 1;
    const tempo_low = req.query.tempo_low ?? 0;
    const tempo_high = req.query.tempo_high ?? 250;
    const explicit = req.query.explicit === 'true' ? 1 : 0;

    connection.query(`
    SELECT *
    FROM songs
    JOIN artists ON songs.artist_id = artists.artist_id
    WHERE name LIKE '%${title}%'
    AND ${duration_low * 1000} <= duration_ms AND duration_ms <= ${duration_high * 1000}
    AND ${danceability_low} <= danceability AND danceability <= ${danceability_high}
    AND ${energy_low} <= energy AND energy <= ${energy_high}
    AND ${valence_low} <= valence AND valence <= ${valence_high}
    AND ${speechiness_low} <= speechiness AND speechiness <= ${speechiness_high}
    AND ${acousticness_low} <= acousticness AND acousticness <= ${acousticness_high}
    AND ${instrumentalness_low} <= instrumentalness AND instrumentalness <= ${instrumentalness_high}
    AND ${liveness_low} <= liveness AND liveness <= ${liveness_high}
    AND explicit_True <= ${explicit}
    LIMIT 10
  `, (err, data) => send_res_array(res, err, data)
    );
}

const album_summary_stats = async function (req, res) {
    const offset = (req.query.page - 1) * req.query.page_size;

    connection.query(`
        SELECT album_name, year, artist_name, total_songs, avg_duration, avg_tempo, avg_loudness, avg_energy, avg_acousticness, avg_instrumentalness
        FROM album_avgs 
        LIMIT ${req.query.page_size}
        OFFSET ${offset};
    `, (err, data) => send_res_array(res, err, data)
    );
}

const danceability_by_decade = async function (req, res) {
    connection.query(`
        SELECT * FROM decade_dance_albums;
    `, (err, data) => send_res_array(res, err, data)
    );
}

const high_variation_albums = async function (req, res) {
    const offset = (req.query.page - 1) * req.query.page_size;

    connection.query(`
        SELECT album_name, first_three_songs FROM VariableAlbums 
        LIMIT ${req.query.page_size}
        OFFSET ${offset}
    `, (err, data) => send_res_array(res, err, data)
    );
}

const custom_query = async function (req, res) {
    // Extract the prompt from the request body or query parameters
    console.log(req.body);
    const { query } = req.body; // Assuming the prompt is sent in the request body

    if (!query) {
        return res.status(400).send('Please provide a prompt');
    }

    connection.query(query, (err, data) => send_res_array(res, err, data));
}

// Function to handle OpenAI API request
const openaiCompletion = (req, res) => {
    // Extract the prompt from the request body or query parameters
    console.log(req.body);
    const { prompt } = req.body; // Assuming the prompt is sent in the request body

    if (!prompt) {
        return res.status(400).send('Please provide a prompt');
    }

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
    openaiCompletion,
    custom_query,
    songs_per_year,
    explicit_songs_per_year,
    clean_artists,
    search_songs,
    album_summary_stats,
    danceability_by_decade,
    high_variation_albums,
}
