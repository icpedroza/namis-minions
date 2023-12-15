import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import LLMPage from "./pages/LLMPage";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/test" element={<TestPage/>}/>
                    <Route path="/beat_buddy" element={<LLMPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}