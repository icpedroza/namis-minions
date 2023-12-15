import {Container, Divider, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useState} from "react";
import LazyTable from "../components/LazyTable";
import config from "../config.json";
import axios from 'axios'; // Import axios if you're using it

export default function LLMPage() {
    const [generatedPlaylist, setGeneratedPlaylist] = useState([]);
    const [query, setQuery] = useState("");
    const [prompt, setPrompt] = useState(""); // Default prompt
    const [loading, setLoading] = useState(false);

    const handleGeneratePlaylist = async () => {
        setLoading(true);
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
            } catch (error) {
                console.error('Query Error', error);
            }
        } catch (error) {
            console.error('OpenAI Error:', error);
            // Handle errors
        } finally {
            setLoading(false);
        }
    };

    const generatedPlaylistColumns = [
        {
            field: 'song_name',
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
        <Container>
            <h1>Welcome to the Beat Buddy! Ask anything you like</h1>
            <Divider/>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt..."
                />
                <button onClick={handleGeneratePlaylist}>Generate Playlist</button>
            <Divider/>
                {loading && <CircularProgress />}
                {generatedPlaylist.length > 0 && ( 
                    <div>
                        <h3>Generated Playlist:</h3>
                        <table>
                            <thead>
                                <tr>
                                    {generatedPlaylistColumns.map(col => (
                                        <th key={col.field}>{col.headerName}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {generatedPlaylist.map((row, index) => (
                                    <tr key={index}>
                                        {generatedPlaylistColumns.map(col => (
                                            <td key={col.field}>{row[col.field]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </Container>
    )
}