import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Grid, Icon, TextField } from '@mui/material';
import { ProdutosService } from '../../services/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export const ModalAdicionarEditar = ({ isOpen, onClose, isEditing, produto }) => {

  const [idProduto, setIdProduto] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState('');
  const [alert, setAlert] = useState({ message: '', severity: 'info' });

  useEffect(() => {
    if (isEditing) {
      setIdProduto(produto.id);
      setNomeProduto(produto.nome);
      setValorProduto(produto.valor);
      setQuantidadeProduto(produto.quantidadeEstoque);
    } else {
      setIdProduto('');
      setNomeProduto('');
      setValorProduto('');
      setQuantidadeProduto('');
    }
  }, [isEditing]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      const produto = {
        id: idProduto,
        nome: nomeProduto,
        quantidadeEstoque: quantidadeProduto,
        valor: formatarValor(valorProduto),
      }

      ProdutosService.atualizarProdutoNaAPI(produto.id, produto).then((response) => {
        if (response instanceof Error) {
          setAlert({ message: `Não foi possível atualizar o produto de código ${produto.id}`, severity: 'error' });
          setTimeout(() => {
            setAlert({ message: '', severity: 'info' });
          }, 3000)
        } else {
          setAlert({ message: 'O produto foi atualizado com sucesso!', severity: 'success' })
          onClose();
          setTimeout(() => {
            setAlert({ message: '', severity: 'info' });
          }, 3000)
        }
      })
    } else {
      const novoProduto = {
        nome: nomeProduto,
        quantidadeEstoque: quantidadeProduto,
        valor: formatarValor(valorProduto),
      }

      ProdutosService.cadastrarProdutoNaAPI(novoProduto).then((response) => {
        if (response instanceof Error) {
          setAlert({ message: 'Não foi possível cadastrar o produto', severity: 'error' });
          setTimeout(() => {
            setAlert({ message: '', severity: 'info' });
          }, 3000)
        } else {
          setAlert({ message: 'O produto foi cadastrado com sucesso!', severity: 'success' });
          onClose();
          setTimeout(() => {
            setAlert({ message: '', severity: 'info' });
          }, 3000)
        }
      })
    }
  }

  const formatarValor = (valor) => {
    const valorString = valor.toString();

    const valorConvertido = valorString.replace(/,/g, ".");

    return valorConvertido;
  }



  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display='flex' justifyContent='space-between'>
            <Typography id="modal-modal-title" paddingLeft='10px' variant="h5" component="h2">
              {isEditing ? 'Edição de Produto' : 'Cadastro de Produto'}
            </Typography>
            <Icon onClick={onClose}>close</Icon>
          </Box>
          <Box
            onSubmit={handleSubmit}
            padding={1}
            component="form"
            display='flex'
            flexDirection='column'
            width="90%"
            sx={{
              flexGrow: 1,
              height: 'auto',
              overflowY: "auto",
              paddingX: "10px",
            }}
          >
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    label="Código"
                    variant="outlined"
                    value={isEditing ? produto.id : idProduto}
                    disabled
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label='Nome'
                    fullWidth
                    variant='outlined'
                    value={nomeProduto}
                    onChange={(e) => {
                      setNomeProduto(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Quantidade"
                    variant='outlined'
                    value={quantidadeProduto}
                    onChange={(e) => {
                      setQuantidadeProduto(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Valor"
                    variant='outlined'
                    value={valorProduto}
                    onChange={(e) => {
                      setValorProduto(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={7}>

                </Grid>
                <Grid item xs={5}>
                  <Button
                    type='submit'
                    fullWidth
                    color='secondary'
                    disableElevation
                    variant='contained'
                    startIcon={isEditing ? <Icon>edit</Icon> : <Icon>save</Icon>}
                  >
                    {isEditing ?
                      <Typography
                        variant='button'
                      >
                        Atualizar
                      </Typography> :
                      <Typography
                        variant='button'
                      >
                        Cadastrar
                      </Typography>
                    }
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
      {alert.message && (
        <Alert sx={{ position: 'fixed', top: '10px', zIndex: '2000', alignSelf: 'center' }} severity={alert.severity}>
          {alert.message}
        </Alert>
      )}
    </div>
  );
}