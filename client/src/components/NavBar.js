import { AppBar, Container, Toolbar, Typography } from '@mui/material';
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
        <AppBar position='static'>
            <Container maxWidth='x1'>
                <Toolbar disableGutters>
                    <NavText href='/' text='Home' isMain/>
                    <NavText href='/test' text='Test'/>
                </Toolbar>
            </Container>
        </AppBar>
    )
}