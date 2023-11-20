# Spotify App [Title Undecided]

Team name: Nami's Minions

Team members: Nami, Jonah, Ian, Kyle

This repository contains code for our CIS 5500 Final Project. We are planning to build a web application that delivers song recommendations and generates playlists for moods using LLMs. This will be based on a backend that stores hundreds of thousands of songs, as well as their features like valence, danceability, etc. We plan to deliver song recommendations using content-based or collaborative filtering. We also are looking to use LLMs to provide more context-aware recommendations. For example, if a user says they want "slow Jazz music," then we might want to use LLMs to extract keywords and create structured queries.

## File Structure

```bash
├── README.md
├── client
│   ├── app.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── public
│       └── index.html
├── data
│   ├── clean_data.csv
│   ├── genres_v2.csv
│   └── tracks_features.csv
├── preprocessing.ipynb
└── server
    ├── config.json
    ├── package-lock.json
    ├── package.json
    ├── routes.js
    └── server.js
```

`client`: Files for the client side of the web application. Uses react.js.
<br>
`server`: Files for the server side of the web application. Makes queries to MySQL database, and uses express to serve requests from the client.
<br> 
`data`: This directory is not displayed on github, but includes initial CSV files and the final cleaned dataset that makes up the main table in our database instance
<br>
`preprocessing.ipynb`: Contains notebook used for cleaning, preprocessing, and joining of two initial datasets into one. Includes steps like initial exploratory analysis, removing nulls, data imputation, etc.



## Data Sources

[Spotify Song Dataset](https://www.kaggle.com/datasets/mrmorj/dataset-of-songs-in-spotify)

[Spotify 1.2M+ Songs Dataset](https://www.kaggle.com/datasets/rodolfofigueroa/spotify-12m-songs)

