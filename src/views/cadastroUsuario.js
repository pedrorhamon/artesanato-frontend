import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome : '',
        email: '', 
        cpf: '',
        celular: '',
        senha: '',
        senhaRepeticao : ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {

        const {nome, email, cpf, celular, senha, senhaRepeticao } = this.state        
        const usuario = {nome,  email,  cpf, celular, senha, senhaRepeticao }

        try{
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario)
            .then( response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                       id="inputNome" 
                                       placeholder="insira seu nome completo"
                                       className="form-control"
                                       name="nome"
                                       onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" 
                                       id="inputEmail"
                                       placeholder="insira seu email"
                                       className="form-control"
                                       name="email"
                                       onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="CPF: *" htmlFor="inputCpf">
                                <input type="text" 
                                       id="inputcpf"
                                       placeholder="000.000.000-00"
                                       className="form-control"
                                       name="cpf"
                                       maxLength="14"
                                       onChange={e => this.setState({cpf: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Celular: *" htmlFor="inputCelular">
                                <input type="text" 
                                       id="inputCelular"
                                       placeholder="(00) 00000-0000"
                                       className="form-control"
                                       name="celular"
                                       maxLength="15"
                                       onChange={e => this.setState({celular: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" 
                                       id="inputSenha"
                                       placeholder="insira a senha"
                                       className="form-control"
                                       name="senha"
                                       onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Confirme a Senha: *" htmlFor="inputConfirmaSenha">
                                <input type="password" 
                                       id="inputConfirmaSenha"
                                       placeholder="insira a senha novamente"
                                       className="form-control"
                                       name="senha"
                                       onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                            </button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)