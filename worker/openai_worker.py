import requests
import json
import sys

# Hardcoded OpenAI API key
api_key = "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"

def get_openai_chat_completion(prompt):
    completion_url = 'https://api.openai.com/v1/chat/completions'  # Chat Completions endpoint
    data = {
        'model': "gpt-3.5-turbo",
        'messages': [
            {
                'role': 'system',
                'content': """You are a helpful assistant. We are working with a Spotify songs database and need you to provide well-formatted queries based on user input. Here is a description of how we create the datasets below. We end up with 3 tables: songs, artists, and albums. You are only to query from these 3 albums. You may join or aggregate them. You are to take in the user input and output only a well-formatted query. No additional words, just the query. The expected output of the query must be a list of no more than 10 song names. No matter the user input, the expected output of the query must maintain that format. Make assumptions where necessary to ensure a valid query.
CREATE TABLE songs_temp (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    album VARCHAR(255),
    album_id VARCHAR(255),
    artists VARCHAR(255),
    artist_ids VARCHAR(255),
    track_number FLOAT,
    disc_number FLOAT,
    danceability FLOAT NOT NULL,
    energy FLOAT NOT NULL,
    `key` INT NOT NULL,  -- Use backticks for reserved keyword "key"
    loudness FLOAT NOT NULL,
    `mode` INT NOT NULL,  -- Use backticks for reserved keyword "mode"
    speechiness FLOAT NOT NULL,
    acousticness FLOAT NOT NULL,
    instrumentalness FLOAT NOT NULL,
    liveness FLOAT NOT NULL,
    valence FLOAT NOT NULL,
    tempo FLOAT NOT NULL,
    duration_ms INT NOT NULL,
    time_signature FLOAT NOT NULL,
    year FLOAT,
    release_date VARCHAR(255),
    explicit_True FLOAT
);


SELECT ROUND(duration_ms / 60000) AS duration_minutes, COUNT(*) AS num_songs
FROM songs_temp
GROUP BY ROUND(duration_ms / 60000)
ORDER BY duration_minutes;

SELECT * FROM songs_temp LIMIT 1;





-- Step 1: Create Tables
CREATE TABLE artists (
    artist_id VARCHAR(255) PRIMARY KEY NOT NULL,
    artist_name VARCHAR(255) NOT NULL
);

CREATE TABLE albums (
    album_id VARCHAR(255) PRIMARY KEY NOT NULL,
    album_name VARCHAR(255) NOT NULL
);

CREATE TABLE songs (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    artist_id VARCHAR(255),
    album_id VARCHAR(255),
    track_number FLOAT,
    disc_number FLOAT,
    danceability FLOAT NOT NULL,
    energy FLOAT NOT NULL,
    `key` INT NOT NULL,
    loudness FLOAT NOT NULL,
    `mode` INT NOT NULL,
    speechiness FLOAT NOT NULL,
    acousticness FLOAT NOT NULL,
    instrumentalness FLOAT NOT NULL,
    liveness FLOAT NOT NULL,
    valence FLOAT NOT NULL,
    tempo FLOAT NOT NULL,
    duration_ms INT NOT NULL,
    time_signature FLOAT NOT NULL,
    year FLOAT,
    explicit_True FLOAT,
    release_date VARCHAR(255),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    FOREIGN KEY (album_id) REFERENCES albums(album_id)
);

-- Step 2: Insert Data
-- Insert unique artists
INSERT IGNORE INTO artists (artist_id, artist_name)
SELECT DISTINCT artist_ids AS id, artists AS artist_name
FROM songs_temp;

-- Insert unique albums
INSERT IGNORE INTO albums (album_id, album_name)
SELECT DISTINCT album_id, album
FROM songs_temp;

-- Insert songs
INSERT INTO songs (
    id, name, artist_id, album_id, track_number, disc_number,
    danceability, energy, `key`, loudness, `mode`, speechiness,
    acousticness, instrumentalness, liveness, valence, tempo,
    duration_ms, time_signature, year, explicit_True, release_date
)
SELECT
    id, name, artist_ids, album_id, track_number, disc_number,
    danceability, energy, `key`, loudness, `mode`, speechiness,
    acousticness, instrumentalness, liveness, valence, tempo,
    duration_ms, time_signature, year, explicit_True, release_date
FROM songs_temp;
"""
            },
            {
                'role': 'user',
                'content': prompt
            }
        ],
        'max_tokens': 100  # Adjust as needed
    }
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'  # Using the hardcoded API key
    }

    response = requests.post(completion_url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        return f"Error: {response.status_code} - {response.text}"

if __name__ == "__main__":
    prompt = sys.argv[1]  # Retrieve prompt from command line arguments
    result = get_openai_chat_completion(prompt)
    print(result)
    sys.stdout.flush()
