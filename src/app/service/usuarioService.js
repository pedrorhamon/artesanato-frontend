import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService {

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    salvar(usuario){
        return this.post('', usuario);
    }

    validar(usuario){
        const erros = []

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório.')
        } else if(!usuario.nome.match(/^[a-zA-Z\s]+$/)) {
            erros.push('Informe o nome, somente letras')
        }

        if(!usuario.email){
            erros.push('O campo Email é obrigatório.')
        }else if( !usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            erros.push('Informe um Email válido.')
        }

        if(!usuario.cpf) {
            erros.push('O campo CPF é obrigatório')
        } else if(!usuario.cpf.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)) {
            erros.push('Informe um CPF válido.')
        }

        if(!usuario.celular) {
            erros.push('Campo celular é obrigatório')
        } else if (!usuario.celular.match(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/)) {
            erros.push('Informe um celular válido.')
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha novamente.')
        }else if( usuario.senha !== usuario.senhaRepeticao ){
            erros.push('As senhas não batem.')
        }        

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;