import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.pecas.map( peca => {
        return (
            <tr key={peca.id}>
                <td>{peca.descricao}</td>
                <td>{ currencyFormatter.format(peca.valor, { locale: 'pt-BR'}) }</td>
                <td>{peca.tipo}</td>
                <td>{peca.mes}</td>
                <td>{peca.status}</td>
                <td>
                    <button className="btn btn-success" title="Efetivar"
                            disabled={ peca.status !== 'PENDENTE' }
                            onClick={e => props.alterarStatus(peca, 'EFETIVADO')} 
                            type="button">
                            <i className="pi pi-check"></i>
                    </button>
                    <button className="btn btn-warning"  title="Cancelar"
                            disabled={ peca.status !== 'PENDENTE' }
                            onClick={e => props.alterarStatus(peca, 'CANCELADO')} 
                            type="button">
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button"   title="Editar"
                            className="btn btn-primary"
                            onClick={e => props.editAction(peca.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(peca)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

