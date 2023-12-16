import {Container, Divider, CircularProgress, FormControl, InputLabel, 
    MenuItem, Select, SelectChangeEvent, createTheme, ThemeProvider, 
    TextField, Button, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography} from "@mui/material";
import {useState} from "react";
import LazyTable from "../components/LazyTable";
import config from "../config.json";
import axios from 'axios'; // Import axios if you're using it

export default function LLMPage() {
    const [generatedPlaylist, setGeneratedPlaylist] = useState([]);
    const [query, setQuery] = useState("");
    const [prompt, setPrompt] = useState(""); // Default prompt
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#6617da'
            },
            secondary: {
                main: '#dd6e42'
            }
        },
      });

    const handleGeneratePlaylist = async () => {
        setLoading(true);
        setError(false);
        try {
            const promptResponse = await axios.post(`http://${config.server_host}:${config.server_port}/openai/completion`, {
                prompt: prompt // Send the prompt in the request body
            });
            console.log(promptResponse);
            const generatedQuery = promptResponse.data;
            setQuery(generatedQuery);
            
            try {
                const queryResponse = await axios.post(`http://${config.server_host}:${config.server_port}/custom_query`, {
                    query: generatedQuery
                });
                console.log(queryResponse);
                setGeneratedPlaylist(queryResponse.data);
                if (queryResponse.data.length == 0) {
                    setError(true);
                }
            } catch (error) {
                setError(true);
                console.error('Query Error', error);
            }
        } catch (error) {
            console.error('OpenAI Error:', error);
            setError(true);
            // Handle errors
        } finally {
            setLoading(false);
        }
    };

    const generatedPlaylistColumns = [
        {
            field: 'name',
            headerName: 'Song',
        },
        {
            field: 'artist_name',
            headerName: 'Artist',
        },
        {
            field: 'album_name',
            headerName: 'Album',
        }
    ];

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <h1>Welcome to the Beat Buddy! Ask anything you like</h1>
                <Divider/>
                    <TextField
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your prompt..."
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGeneratePlaylist}
                        disabled={loading}
                    >
                        Generate Playlist
                    </Button>
                <Divider/>
                    {loading && (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height={200} // Adjust height as needed
                        >
                            <CircularProgress />
                        </Box>
                    )}
                    {error && (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height={200} // Adjust height as needed
                        >
                            <Typography variant="h4" color="primary">Beat Buddy had an oopsy-daisy. Try again with a new prompt!</Typography>
                        </Box>
                    )}
                    {generatedPlaylist.length > 0 && ( 
                        <Box marginTop={2}>
                            <h3>Generated Playlist:</h3>
                            <TableContainer>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    {generatedPlaylistColumns.map((column) => (
                                    <TableCell key={column.field}>{column.headerName}</TableCell>
                                    ))}
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {generatedPlaylist.map((row, index) => (
                                    <TableRow key={index}>
                                    {generatedPlaylistColumns.map((column) => (
                                        <TableCell key={column.field}>{row[column.field]}</TableCell>
                                    ))}
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Box>
                    )}
            </Container>
        </ThemeProvider>
    )
}