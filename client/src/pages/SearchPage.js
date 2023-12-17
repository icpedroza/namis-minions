import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Slider,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import config from "../config.json";

export function formatDuration(sec) {
    const date = new Date(0);
    date.setSeconds(sec ?? 0);
    return date.toISOString().substring(14, 19);
}

export default function SearchPage() {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState([60, 660]);
    const [danceability, setDanceability] = useState([0, 1]);
    const [energy, setEnergy] = useState([0, 1]);
    const [valence, setValence] = useState([0, 1]);
    const [speechiness, setSpeechiness] = useState([0, 1]);
    const [acousticness, setAcousticness] = useState([0, 1]);
    const [instrumentalness, setInstrumentalness] = useState([0, 1]);
    const [liveness, setLiveness] = useState([0, 1]);
    const [tempo, setTempo] = useState([0, 250]);
    const [explicit, setExplicit] = useState(false);

    const [data, setData] = useState([]);
    const search = () => {
        fetch(`http://${config.server_host}:${config.server_port}/search_songs?title=${title}` +
            `&duration_low=${duration[0]}&duration_high=${duration[1]}` +
            `&danceability_low=${danceability[0]}&danceability_high=${danceability[1]}` +
            `&energy_low=${energy[0]}&energy_high=${energy[1]}` +
            `&valence_low=${valence[0]}&valence_high=${valence[1]}` +
            `&speechiness_low=${speechiness[0]}&speechiness_high=${speechiness[1]}` +
            `&acousticness_low=${acousticness[0]}&acousticness_high=${acousticness[1]}` +
            `&instrumentalness_low=${instrumentalness[0]}&instrumentalness_high=${instrumentalness[1]}` +
            `&liveness_low=${liveness[0]}&liveness_high=${liveness[1]}` +
            `&tempo_low=${tempo[0]}&tempo_high=${tempo[1]}` +
            `&explicit=${explicit}`
        )
            .then(res => res.json())
            .then(resJson => {
                // DataGrid expects an array of objects with a unique id.
                // To accomplish this, we use a map with spread syntax (http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
                const songsWithId = resJson.map((song) => ({ id: song.song_id, ...song }));
                setData(songsWithId);
            });
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Title',
            renderCell: row => <p>{row.name}</p>
        },
        {
            field: 'artists',
            headerName: 'Artist',
            renderCell: row => <p>{row.artist_name}</p>
        },
        {
            field: 'duration',
            headerName: 'Duration',
            renderCell: row => <p>{formatDuration(row.duration_ms/1000)}</p>
        }
    ]

    return (
        <Container>
            <h2 align='center'>Advanced Search</h2>
            <Grid container spacing={6}>
                <Grid item xs={8}>
                    <TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%" }}/>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        label='Explicit'
                        control={<Checkbox checked={explicit} onChange={(e) => setExplicit(e.target.checked)} />}
                    />
                </Grid>
                <Grid item xs={4}>
                    <p>Duration</p>
                    <Slider
                        value={duration}
                        min={60}
                        max={660}
                        step={10}
                        onChange={(e, newValue) => setDuration(newValue)}
                        valueLabelDisplay='auto'
                        valueLabelFormat={value => <div>{formatDuration(value)}</div>}
                    />
                </Grid>
                <Grid item xs={4}>
                    <p>Danceability</p>
                    <Slider
                        value={danceability}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e, newValue) => setDanceability(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
                <Grid item xs={4}>
                    <p>Energy</p>
                    <Slider
                        value={energy}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e, newValue) => setEnergy(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
                <Grid item xs={4}>
                    <p>Valence</p>
                    <Slider
                        value={valence}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e, newValue) => setValence(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
                <Grid item xs={4}>
                    <p>Speechiness</p>
                    <Slider
                        value={speechiness}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e, newValue) => setSpeechiness(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
                <Grid item xs={4}>
                    <p>Acousticness</p>
                    <Slider
                        value={acousticness}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e, newValue) => setAcousticness(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
                <Grid item xs={4}>
                    <p>Instrumentalness</p>
                    <Slider
                        value={instrumentalness}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e, newValue) => setInstrumentalness(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
                <Grid item xs={4}>
                    <p>Liveness</p>
                    <Slider
                        value={liveness}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e, newValue) => setLiveness(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
                <Grid item xs={4}>
                    <p>Tempo</p>
                    <Slider
                        value={tempo}
                        min={0}
                        max={250}
                        step={1}
                        onChange={(e, newValue) => setTempo(newValue)}
                        valueLabelDisplay='auto'
                    />
                </Grid>
            </Grid>
            <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
                Search
            </Button>
            <h2 align='center'>Results</h2>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(col =>
                                <TableCell key={col.headerName}>
                                    <Typography fontWeight="bold">{col.headerName}</Typography>
                                </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, idx) =>
                            <TableRow key={idx}>
                                {
                                    columns.map(col =>
                                        <TableCell key={col.headerName}>
                                            {col.renderCell ? col.renderCell(row) : defaultRenderCell(col, row)}
                                        </TableCell>)
                                }
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
