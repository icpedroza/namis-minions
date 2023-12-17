// PlaylistPage.js defines the "curated playlist" page, which displays the result of multiple queries upon selecting
// a specific "playlist" which corresponds to a query result.

import {Container, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import LazyTable from "../components/LazyTable";
import config from "../config.json";
import SimpleTable from "../components/SimpleTable";

export default function PlaylistPage() {
    const [playlist, setPlaylist] = useState([]);

    const handleChange = event => {
        setPlaylist(event.target.value);
    };

    const playlist_cols = [
        {
            field: 'song_name',
            headerName: 'Title',
        },
        {
            field: 'album_name',
            headerName: 'Album'
        },
        {
            field: 'artist_name',
            headerName: 'Artist'
        }
    ]

    return (
        <Container>
            <h4>Select one of our curated playlists below</h4>
            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}> {/* the playlist selection box */}
                <InputLabel id="playlist-select-label">Playlist</InputLabel>
                <Select
                    labelId="playlist-select-label"
                    id="playlist-select"
                    value={playlist}
                    onChange={handleChange}
                    label="Playlist"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"happy_mood_playlist"}>Happy Mood Playlist</MenuItem>
                    <MenuItem value={"hype_playlist"}>Hype Playlist</MenuItem>
                </Select>
            </FormControl>
            <LazyTable
                route={`http://${config.server_host}:${config.server_port}/${playlist}`}
                columns={playlist_cols}
                defaultPageSize={10}
            />
        </Container>
    )
}