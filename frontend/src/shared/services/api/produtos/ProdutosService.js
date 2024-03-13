import { Api } from '../axios-config';

const obterProdutosDaAPI = async () => {
    try {
        const { data } = await Api.get('/produtos')

        if (data) {
            return {
                data
            }
        }

        return new Error ('Erro ao listar os produtos')
    } catch (e) {
        console.log(e)
        return new Error((e.message || 'Error ao listar os produtos'))
    }
}

const cadastrarProdutoNaAPI = async (info) => {
    try {
        const { data } = await Api.post('/produtos', info)

        if (data) {
            return data.id
        }

        return new Error ('Erro ao cadastrar o produto')
    } catch (e) {
        console.log(e)
        return new Error((e.message || 'Error ao cadastrar o produto'))
    }
}

const atualizarProdutoNaAPI = async (id, info) => {
    try {
        const { data } = await Api.put(`/produtos/${id}`, info)
        
        if (data) {
            return data.id
        }
        
        return new Error ('Erro ao atualizar o produto')
    } catch (e) {
        console.log(e)
        return new Error((e.message || 'Error ao atualizar o produto'))
    }
}

const deletarProdutoNaAPI = async (id) => {
    try {
        const { data } = await Api.delete(`/produtos/${id}`)
        
        if (data) {
            return data.id
        }
        
        return new Error ('Erro ao deletar o produto')
        
    } catch (e) {
        console.log(e)
        return new Error((e.message || 'Error ao deletar o produto'))
    }
}

export const ProdutosService = {
    obterProdutosDaAPI,
    cadastrarProdutoNaAPI,
    atualizarProdutoNaAPI,
    deletarProdutoNaAPI
}