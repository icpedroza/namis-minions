# Beat Buddy

CIS 550 Group 1

Team members: Nami, Jonah, Ian, Kyle

This repository contains code for our CIS 5500 Final Project. We are planning to build a web application that delivers song recommendations and generates playlists for moods using LLMs. This will be based on a backend that stores hundreds of thousands of songs, as well as their features like valence, danceability, etc. We plan to deliver song recommendations using content-based or collaborative filtering. We also are looking to use LLMs to provide more context-aware recommendations. For example, if a user says they want "slow Jazz music," then we might want to use LLMs to extract keywords and create structured queries.

## Build and Run Instructions
This repository contains two components, the client and the server, which must be run simultaneously for the application to function properly.
In ***both*** the ```./server``` and ```./client``` folders one must first run

```bash
$npm install
```

to install the required npm dependencies, and then

```bash
$npm start
```

to run the client and server.

## File Structure

```bash
├── README.md
├── client
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── components
│       │   ├── LazyTable.js
│       │   ├── NavBar.js
│       │   └── SimpleTable.js
│       ├── pages
│       │   ├── HomePage.js
│       │   ├── LLMPage.js
│       │   ├── SearchPage.js
│       │   ├── StatsPage.js
│       │   └── TestPage.js
│       ├── config.json
│       ├── App.js
│       └── index.js
├── preprocessing.ipynb
└── server
    ├── cert.pem
    ├── csr.pem
    ├── key.pem
    ├── openai_worker.py
    ├── config.json
    ├── package-lock.json
    ├── package.json
    ├── routes.js
    └── server.js

```

`client`: Files for the client side of the web application. Uses react.js. Includes both React Pages and Components folders
<br>
`server`: Files for the server side of the web application. Makes queries to MySQL database, and uses express to serve requests from the client. Includes an openai_worker python script to get custom queries.
<br> 
`preprocessing.ipynb`: Contains notebook used for cleaning, preprocessing, and joining of two initial datasets into one. Includes steps like initial exploratory analysis, removing nulls, data imputation, etc.



## Data Sources

[Spotify Song Dataset](https://www.kaggle.com/datasets/mrmorj/dataset-of-songs-in-spotify)

[Spotify 1.2M+ Songs Dataset](https://www.kaggle.com/datasets/rodolfofigueroa/spotify-12m-songs)

