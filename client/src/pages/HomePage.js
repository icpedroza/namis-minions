// IMPORTANT: HomePage.js is not used in the final website (only for testing purposes)

import {Container, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useState} from "react";
import LazyTable from "../components/LazyTable";
import config from "../config.json";
import SimpleTable from "../components/SimpleTable";

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
            <p>
            Beat Buddy is a cutting edge web based application that uses machine learning technology to deliver personalized song recommendations.
            </p>
            <Divider/>
            <SimpleTable route={`http://${config.server_host}:${config.server_port}/artist_albums`} columns={top_artists_cols} title='Most Prolific Artists' pageSize={10}/>
        </Container>
    )
}
