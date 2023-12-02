import {Container, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useState} from "react";
import LazyTable from "../components/LazyTable";
import config from "../config.json";

export default function HomePage() {
    const [query, setQuery] = useState([]);

    const handleChange = event => {
        setQuery(event.target.value);
        console.log(event.target.value);
    };

    const top_artists_cols = [
        {
            field: 'artists',
            headerName: 'Artist',
            renderCell: row => <p>{row.artists}</p>
        },
        {
            field: 'total_songs',
            headerName: 'Total Songs',
            renderCell: row => <p>{row.total_songs}</p>
        }
    ]

    return (
        <Container>
            <h1>Welcome to our website! :)</h1>
            <Divider/>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="query-select-label">Query</InputLabel>
                <Select
                    labelId="query-select-label"
                    id="query-select"
                    value={query}
                    onChange={handleChange}
                    label="Query"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"top_artists"}>Top Artists</MenuItem>
                </Select>
            </FormControl>
            <Divider/>
            <LazyTable route={`http://${config.server_host}:${config.server_port}/${query}`} columns={top_artists_cols}/>
        </Container>
    )
}