import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import LLMPage from "./pages/LLMPage";
import StatsPage from "./pages/StatsPage";
import SearchPage from "./pages/SearchPage";
import PlaylistPage from "./pages/PlaylistPage";
import { lime, purple } from "@mui/material/colors";

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

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<LLMPage/>} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/playlists" element={<PlaylistPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}