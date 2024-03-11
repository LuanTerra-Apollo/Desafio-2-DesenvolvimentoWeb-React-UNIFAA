import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import {ModalAdicionarEditar} from "../modal-adicionar-editar/ModalAdicionarEditar";
import React from "react";



export const CardControleDeEstoque = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', alignSelf: 'center', marginBottom: '5px' }}>
                <Typography variant="h1" fontWeight='bold' sx={{ fontSize: '24px', textAlign: 'center' }}>
                    Controle de Estoque
                </Typography>
                <Button onClick={() => setIsOpen(true)} color='secondary' variant="contained" sx={{ color: 'black' }}>Adicionar</Button>
            </Box>
            <Paper sx={{
                display: 'flex', flexDirection: 'column', justifyContent:'center', width: '80%', maxWidth: '80%', height: '80%', minHeight: '400px', alignSelf: 'center', justifySelf: 'center',
                borderRadius: '5px',
                backgroundColor: '#4D3B00'
            }} elevation={3}>

                <TableContainer sx={{width: '80%', alignSelf: 'center'}} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width='100'>Código</TableCell>
                                <TableCell align="center" width='200'>Nome</TableCell>
                                <TableCell align="center" width='100'>Quantidade</TableCell>
                                <TableCell align="center" width='100'>Valor</TableCell>
                                <TableCell align="center" width='200'>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.calories}</TableCell>
                                    <TableCell align="center">{row.fat}</TableCell>
                                    <TableCell align="center">{row.carbs}</TableCell>
                                    <TableCell align="center">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <ModalAdicionarEditar isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </Box>
    )
}