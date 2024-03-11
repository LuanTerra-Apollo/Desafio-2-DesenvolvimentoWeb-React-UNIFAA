import { AppBar, Box, Container, Paper, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import TituloBrand from '../assets/título-brand.png'
import React from 'react';
import { useAuthContext } from '../contexts';

export const LayoutBaseDePagina = ({children, login}) => {

    const { logout } = useAuthContext();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    }

    return (
            <Container disableGutters maxWidth={false} sx={{paddingLeft: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', width: '100%',}}>
            <Box sx={{ flexGrow: 1}}>
                <AppBar sx={{backgroundColor: '#322600', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}} position ='static'>
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <img src={TituloBrand} style={{width: '200px', height: '80px'}} />
                        {login ? null : <LogoutIcon onClick={handleLogout} sx={{color: '#C19400', "&:hover": { color: "#A47E00"}}}  fontSize='large'/>}
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{width: '100%', height: '80%', display: 'flex', justifyContent: 'center'}}>
                {children}
            </Box>

            <Box sx={{ flexGrow: 1}}>
                <AppBar sx={{backgroundColor: '#322600', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}} position ='static'>
                    <Toolbar>
                        <Typography variant='h3' sx={{fontSize: '30px', color: '#866700', width: '100%', textAlign: 'right'}}>
                            Direitos Reservados
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            </Container>
    );
}