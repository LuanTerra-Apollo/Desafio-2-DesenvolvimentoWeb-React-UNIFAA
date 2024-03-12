import { Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material"
import { ModalAdicionarEditar } from "../modal-adicionar-editar/ModalAdicionarEditar";
import { useEffect, useState } from "react";
import { ProdutosService } from "../../services/api";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export const CardControleDeEstoque = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([])


    useEffect(() => {
        setIsLoading(true);
        handleAtualizarProdutosNaTabela();
    }, []);

    useEffect(() => {
        console.log(isEditing)
    }, [isEditing])

    const handleClickAdicionar = () => {
        setIsEditing(false)
        setIsOpen(true)
        console.log(isOpen)
    }

    const handleClickEditar = (produto) => {
        setIsEditing(true)
        setIsOpen(true)
        setEditingProduct(produto)
    }

    const handleClickDeletar = (id) => {
        setIsLoading(true);
        ProdutosService.deletarProdutoNaAPI(id).then((response) => {
            if (response instanceof Error) {
                alert(result.message);
            } else {
                setIsLoading(false);
                handleAtualizarProdutosNaTabela()
            }
        })
    }

    const handleClose = () => {
        setIsOpen(false);
        setIsLoading(true);
        handleAtualizarProdutosNaTabela();
    }

    const handleAtualizarProdutosNaTabela = () => {
        ProdutosService.obterProdutosDaAPI().then((response) => {
            if (response instanceof Error) {
                alert(result.message);
            } else {
                setIsLoading(false);
                setRows(response.data)
            }
        })
    }

    const formatarValor = (valor) => {
    
        const valorNumber = Number(valor);

        return `R$ ${valorNumber.toFixed(2).replace('.', ',')}`;
    }


    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', alignSelf: 'center', marginBottom: '5px' }}>
                <Typography variant="h1" fontWeight='bold' sx={{ fontSize: '24px', textAlign: 'center' }}>
                    Controle de Estoque
                </Typography>
                <Button onClick={handleClickAdicionar} color='secondary' variant="contained" sx={{ color: 'black' }}>Adicionar</Button>
            </Box>
            <Paper sx={{
                display: 'flex', flexDirection: 'column', paddingTop: '20px', width: '80%', maxWidth: '80%', height: '80%', minHeight: '400px', alignSelf: 'center', justifySelf: 'center',
                borderRadius: '5px',
                backgroundColor: '#4D3B00'
            }} elevation={3}>

                <TableContainer sx={{ width: '80%', alignSelf: 'center' }} component={Paper}>
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
                            {Array.isArray(rows) && rows.length > 0 && rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.nome}</TableCell>
                                    <TableCell align="center">{row.quantidadeEstoque}</TableCell>
                                    <TableCell align="center">{formatarValor(row.valor)}</TableCell>
                                    <TableCell align="center"><EditIcon onClick={() => {handleClickEditar(row)}} /> / <DeleteIcon onClick={() => {handleClickDeletar(row.id)}} /> </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        {Array.isArray(rows) && rows.length == 0 && !isLoading && (
                            <caption>Nenhum registro encontrado.</caption>
                        )}

                        <TableFooter>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <LinearProgress variant="indeterminate" />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
            <ModalAdicionarEditar isOpen={isOpen} onClose={handleClose} isEditing={isEditing} produto={isEditing ? editingProduct : null}/>
        </Box>
    )
}