import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import LLMPage from "./pages/LLMPage";
import StatsPage from "./pages/StatsPage";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

export default function App() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return isAuthenticated && (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/test" element={<TestPage/>}/>
                    <Route path="/beat_buddy" element={<LLMPage/>}/>
                    <Route path="/stats" element={<StatsPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}