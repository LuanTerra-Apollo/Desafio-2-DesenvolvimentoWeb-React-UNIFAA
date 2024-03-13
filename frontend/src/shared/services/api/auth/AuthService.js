import { Api } from "../axios-config";

const login = async (email, senha) => {
    try{
        const { data } = await Api.post('/login', { email, senha })

        if (data) {
            return data;
        }

        return new Error ('Erro ao Logar')
    } catch (e) {
        console.log(e)
        return new Error ((e.message || 'Erro ao Logar'))
    }
}

export const AuthService = {
    login
}