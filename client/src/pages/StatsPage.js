import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis, LineChart, CartesianGrid, Line, Label } from "recharts";
import config from "../config.json";

const CustomizedYAxisTick = (props) => {
    const { x, y, payload } = props;
    const words = payload.value.split(' ');

    return (
        <g transform={`translate(${x},${y})`}>
            {words.map((word, index) => (
                <text key={index} x={0} dy={index * 12} textAnchor="end" fontSize={12} fill="#666" transform="rotate(-45)">
                    {word}
                </text>
            ))}
        </g>
    );
};

export default function StatsPage() {
    const [topArtistData, setTopArtistData] = useState([]);
    useEffect(() => {
        fetch(`https://${config.server_host}:${config.server_port}/top_artists?page_size=10`)
            .then(res => res.json())
            .then(resJson => setTopArtistData(resJson));
    }, []);

    const [mostAlbumsData, setMostAlbumsData] = useState([]);
    useEffect(() => {
        fetch(`https://${config.server_host}:${config.server_port}/artist_albums?page_size=10&sorted=true`)
            .then(res => res.json())
            .then(resJson => setMostAlbumsData(resJson));
    }, []);

    const [musicTrendsData, setMusicTrendsData] = useState([]);
    useEffect(() => {
        fetch(`https://${config.server_host}:${config.server_port}/music_trends?page_size=10&sorted=true`)
            .then(res => res.json())
            .then(resJson => setMusicTrendsData(resJson));
    }, []);

    const [annualSongsData, setAnnualSongsData] = useState([]);
    useEffect(() => {
        fetch(`https://${config.server_host}:${config.server_port}/songs_per_year?page_size=10&sorted=true`)
            .then(res => res.json())
            .then(resJson => setAnnualSongsData(resJson));
    }, []);

    const [explicitSongsData, setExplicitSongsData] = useState([]);
    useEffect(() => {
        fetch(`https://${config.server_host}:${config.server_port}/explicit_songs_per_year?page_size=10&sorted=true`)
            .then(res => res.json())
            .then(resJson => setExplicitSongsData(resJson));
    }, []);

    return (

        <Grid container spacing={10} align='center' style={{ paddingTop: '100px' }}>
            <Grid item xs={6}>
                <Typography variant='h5' align='center'>most songs</Typography>
                <BarChart width={800} height={500} data={topArtistData} margin={{bottom: 40}}>
                    <XAxis dataKey="artist_name" type="category" interval={0} tick={<CustomizedYAxisTick />}/>
                    <YAxis/>
                    <Bar dataKey="total_songs"/>
                    <Tooltip/>
                </BarChart>
            </Grid>

            <Grid item xs={6}>
                <Typography variant='h5' align='center'>most albums</Typography>
                <BarChart width={800} height={500} data={mostAlbumsData} margin={{bottom: 40}}>
                    <XAxis dataKey="artist_name" type="category" interval={0} tick={<CustomizedYAxisTick />}/>
                    <YAxis/>
                    <Bar dataKey="total_albums"/>
                    <Tooltip/>
                </BarChart>
            </Grid>

            <Grid item xs={6}>
                <Typography variant='h5' align='center'>Yearly Trends Across Songs</Typography>
                <LineChart width={730} height={250} data={musicTrendsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avg_danceability" stroke="#f47068" dot={false} />
                    <Line type="monotone" dataKey="avg_energy" stroke="#ffb3ae" dot={false} />
                    <Line type="monotone" dataKey="avg_acousticness" stroke="#f78c6b" dot={false} />
                    <Line type="monotone" dataKey="avg_instrumentalness" stroke="#1697a6" dot={false} />
                    <Line type="monotone" dataKey="avg_liveness" stroke="#0e606b" dot={false} />
                    <Line type="monotone" dataKey="avg_valence" stroke="#ffc24b" dot={false} />
                </LineChart>
            </Grid>

            <Grid item xs={6}>
                <Typography variant='h5' align='center'>Number of Songs Per Year</Typography>
                <LineChart width={730} height={250} data={annualSongsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="num_songs" stroke="#f47068" dot={false} />
                </LineChart>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='h5' align='center'>Number of Explicit Songs Per Year</Typography>
                <LineChart width={730} height={250} data={explicitSongsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="num_explicit_songs" stroke="#f47068" dot={false} />
                </LineChart>
            </Grid>

        </Grid>
    )
}
