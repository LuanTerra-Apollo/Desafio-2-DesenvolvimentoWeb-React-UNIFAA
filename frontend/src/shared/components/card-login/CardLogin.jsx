import { Alert, Box, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts"
import { useState } from "react";


export const CardLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [ alert, setAlert ] = useState({ message: '', severity: 'info' });

    const handleLogar = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (email === '' || senha === '') {
            setIsLoading(false);
            setAlert({
                message: 'Preencha todos os campos',
                severity: 'error'
            });
            setTimeout(() => {
                setAlert({ message: '', severity: 'info' });
                setSenha('');
                setEmail('');
            }, 3000)
            return;
        }
        login(email, senha).then((result) => {
            if (result && result.mensagem) {
                setAlert({ message: 'Algo deu errado, tente novamente mais tarde!', severity: 'error' });
                console.log(result.message);
                setIsLoading(false);
                setTimeout(() => {
                    setAlert({ message: '', severity: 'info' });
                }, 3000);
            } else {
                setIsLoading(false);
                navigate('/gerenciador-de-estoque');
            }
        });
    };

    return (
        <Paper sx={{
            display: 'flex', flexDirection: 'column',width: '35%', maxWidth: '40%', height: '45%', minHeight: '400px', alignSelf: 'center', justifySelf: 'center',
            borderRadius: '5px',
            backgroundColor: '#4D3B00'
        }} elevation={3}>
            <Typography variant="h1" fontWeight='bold' sx={{ fontSize: '48px', marginTop: '20px', marginBottom: '30px', textAlign: 'center' }}>
                Login
            </Typography>

            <form onSubmit={handleLogar} style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems:'center', gap: 5, width: '90%' }}>
                <Box flex={1} display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={5} width='90%'>
                    <TextField
                        sx={{ width: '70%', minWidth: '200px' }}
                        label='Email'
                        variant="filled"
                        value={email}
                        disable={isLoading ? 'true' : 'undefined'}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        sx={{
                            width: '70%',
                            minWidth: '200px',
                         }}
                        label='Senha'
                        type='password'
                        value={senha}
                        disable={isLoading ? 'true' : 'undefined'}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <Button
                        type="submit"
                        sx={{ width: '70%', minWidth: '100px' }}
                        variant="contained"
                        disable={isLoading ? 'true' : 'undefined'}
                        endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" color="inherit" /> : undefined}
                    >
                        <Typography variant="button" sx={{ color: 'black' }}>Logar</Typography>
                    </Button>
                </Box>
            </form>
            {alert.message && (
                <Alert sx={{position: 'fixed', top: '10px', zIndex: '2000', alignSelf:'center'}} severity={alert.severity}>
                    {alert.message}
                </Alert>
            )}
        </Paper>
    )
}