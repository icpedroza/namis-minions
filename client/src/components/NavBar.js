import {AppBar, Button, Container, Toolbar, Typography} from '@mui/material';
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
                    <NavText href='/' text='Beat Buddy' isMain/>
                    <NavText href='/test' text='Test'/>
                    <NavText href='/beat_buddy' text='Beat Buddy'/>
                    <NavText href='/stats' text='Statistics'/>
                    <NavText href='/search' text='Search' />
                </Toolbar>
            </AppBar>
        </Container>
    )
}