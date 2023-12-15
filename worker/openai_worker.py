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
                'content': """You are a helpful assistant. We are working with a Spotify songs database and need you to provide well-formatted queries based on user input. Here is a description of how we create the datasets below. We end up with 3 tables: songs, artists, and albums. You are only to query from these 3 albums. You may join or aggregate them. You are to take in the user input and output only a well-formatted query. No additional words, just the query. The expected output of the query must be a list of no more than 10 song names, with their corresponding artist name and album name for each. No matter the user input, the expected output of the query must maintain that format. Make assumptions where necessary to ensure a valid query. Use valid query optimization to prevent excessive query times. This should include reducing join sizes by selecting only the features needed. Ensure that every query follows this query optimization.

-- The Tables
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
"""
            },
            {
                'role': 'user',
                'content': prompt
            },
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
