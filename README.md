# Spotify App [Title Undecided]

Team name: Nami's Minions

Team members: Nami, Jonah, Ian, Kyle

This repository contains code for our CIS 5500 Final Project. We are building a web application that allows people to find songs similar to ones that they know and love. While Spotify's radio function is helpful, it often creates an echo chamber where similar songs all have the same recommendations (e.g. song A recommends song B, and song B recommends song A). We are looking to integrate LLMs to allow for intelligent querying of songs in existing databases.

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

`client`: Web application files [Jonah to add more] 
<br> 
`data`: This directory is not displayed on github, but includes initial CSV files and the final cleaned dataset that makes up the main table in our database instance
<br>
`preprocessing.ipynb`: Contains notebook used for cleaning, preprocessing, and joining of two initial datasets into one. Includes steps like initial exploratory analysis, removing nulls, data imputation, etc.



## Data Sources

[Spotify Song Dataset](https://www.kaggle.com/datasets/mrmorj/dataset-of-songs-in-spotify)

[Spotify 1.2M+ Songs Dataset](https://www.kaggle.com/datasets/rodolfofigueroa/spotify-12m-songs)

