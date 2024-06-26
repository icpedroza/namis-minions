// NavBar.js defines a component, similar to that in HW2, to create a navbar that is persistent across all pages.

import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

function NavText({ href, text, isMain }) {
    return (
        <Typography
            variant={isMain ? 'h5' : 'h7'}
            noWrap
            style={{
                marginRight: '30px',
                fontFamily: 'sans-serif',
                fontWeight: 700,
                letterSpacing: '.1rem',
            }}
        >
            <NavLink
                to={href}
                style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                {text}
            </NavLink>
        </Typography>
    )
}

export default function NavBar() {
    return (
        <Container maxWidth='xl'>
            <AppBar position='static' style={{ borderRadius: 15 }}>
                <Toolbar>
                    <NavText href='/' text='Beat Buddy' isMain />
                    <NavText href='/stats' text='Stats & Info' />
                    <NavText href='/search' text='Search Page' />
                    <NavText href='/playlists' text='Curated Playlists' />
                </Toolbar>
            </AppBar>
        </Container>
    )
}