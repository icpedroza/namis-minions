import {Container, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Bar, BarChart, Legend, Tooltip, XAxis, YAxis} from "recharts";
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
        fetch(`http://${config.server_host}:${config.server_port}/top_artists?page_size=10`)
            .then(res => res.json())
            .then(resJson => setTopArtistData(resJson));
    }, []);

    const [mostAlbumsData, setMostAlbumsData] = useState([]);
    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/artist_albums?page_size=10&sorted=true`)
            .then(res => res.json())
            .then(resJson => setMostAlbumsData(resJson));
    }, []);

    return (
        <Grid container spacing={2} align='center' style={{ paddingTop:'100px' }}>
            <Grid item xs={6}>
                <Typography variant='h5' align='center'>most songs</Typography>
                <BarChart width={600} height={300} data={topArtistData} margin={{bottom: 40}}>
                    <XAxis dataKey="artist_name" type="category" interval={0} tick={<CustomizedYAxisTick />}/>
                    <YAxis/>
                    <Bar dataKey="total_songs"/>
                    <Tooltip/>
                </BarChart>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h5' align='center'>most albums</Typography>
                <BarChart width={600} height={300} data={mostAlbumsData} margin={{bottom: 40}}>
                    <XAxis dataKey="artist_name" type="category" interval={0} tick={<CustomizedYAxisTick />}/>
                    <YAxis/>
                    <Bar dataKey="total_albums"/>
                    <Tooltip/>
                </BarChart>
            </Grid>
        </Grid>
    )
}