import React from 'react'

import UsuarioService from '../app/service/usuarioService'
import { AuthContext } from '../main/provedorAutenticacao'

class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor(){
        super()
        this.usuarioService = new UsuarioService();
    }

    // componentDidMount(){
    //     const usuarioLogado = this.context.usuarioAutenticado

    //     this.usuarioService
    //         .obterSaldoPorUsuario(usuarioLogado.id)
    //         .then( response => {
    //             this.setState({ saldo: response.data})
    //         }).catch(error => {
    //             console.error(error.response)
    //         });
    // }

    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é um sistema de Obras de artesanato.</p>
                <hr className="my-4" />
                <p>E essa é sua área, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-success btn-lg" 
                    href="/cadastro-usuarios" 
                    role="button"><i className="pi pi-users"></i>  
                     Cadastrar Usuário
                    </a>
                    <a className="btn btn-warning btn-lg" 
                    href="/cadastro-pecas" 
                    role="button"><i className="pi pi-money-bill"></i>  
                     Cadastrar Peças para vendas
                    </a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext;

export default Home