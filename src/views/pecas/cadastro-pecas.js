import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'

import LocalStorageService from '../../app/service/localstorageService'
import PecasService from '../../app/service/pecaService'

class CadastroPecas extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new PecasService();
    }

    componentDidMount(){
        const params = this.props.match.params
       
        if(params.id){
            this.service
                .obterPorId(params.id)
                .then(response => {
                    this.setState( {...response.data, atualizando: true} )
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo } = this.state;
        const peca = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };

        try{
            this.service.validar(peca)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }     

        this.service
            .salvar(peca)
            .then(response => {
                this.props.history.push('/consulta-pecas')
                messages.mensagemSucesso('Lançamento da Peça cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;

        const peca = { descricao, valor, mes, ano, tipo, usuario, status, id };
        
        this.service
            .atualizar(peca)
            .then(response => {
                this.props.history.push('/consulta-pecas')
                messages.mensagemSucesso('Peça atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    render(){
        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title={ this.state.atualizando ? 'Atualização de Peças'  : 'Cadastro de Peças' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *" >
                            <input id="inputDescricao" type="text" 
                                   className="form-control" 
                                   name="descricao"
                                   placeholder='insira a descrição'
                                   value={this.state.descricao}
                                   onChange={this.handleChange}  />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" 
                                   type="number"
                                   name="ano"
                                   placeholder='insira o ano'
                                   value={this.state.ano}
                                   maxLength="4"
                                   onChange={this.handleChange} 
                                   className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" 
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                                        lista={meses} 
                                        placeholder='Selecione'
                                        name="mes"
                                        className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                         <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" 
                                   type="number"
                                   name="valor"
                                   placeholder='insira o valor'
                                   value={this.state.valor}
                                   onChange={this.handleChange} 
                                   className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                         <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" 
                                        lista={tipos} 
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                         <FormGroup id="inputStatus" label="Status: ">
                            <input type="text" 
                                   className="form-control" 
                                   name="status"
                                   value={this.state.status}
                                   disabled />
                        </FormGroup>
                    </div>

                   
                </div>
                <div className="row">
                     <div className="col-md-6" >
                        { this.state.atualizando ? 
                            (
                                <button onClick={this.atualizar} 
                                        className="btn btn-success">
                                        <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button onClick={this.submit} 
                                        className="btn btn-success">
                                        <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                        <button onClick={e => this.props.history.push('/consulta-pecas')} 
                                className="btn btn-danger">
                                <i className="pi pi-times"></i>Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroPecas);