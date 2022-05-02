import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

export default class PecasService extends ApiService {

    constructor(){
        super('/api/pecas')
    }

    obterListaMeses(){
        return  [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },
        ]
    }

    obterListaTipos(){
        return  [
            { label: 'Selecione...', value: '' },
            { label: 'Credito' , value : 'CREDITO' },
            { label: 'Pix' , value : 'PIX' }
        ]

    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, { status })
    }

    validar(peca){
        const erros = [];

        if(!peca.ano){
            erros.push("Informe o Ano.")
        }

        if(!peca.mes){
            erros.push("Informe o Mês.")
        }

        if(!peca.descricao){
            erros.push("Informe a Descrição.")
        }

        if(!peca.valor){
            erros.push("Informe o Valor.")
        }

        if(!peca.tipo){
            erros.push("Informe o Tipo.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    salvar(peca){
        return this.post('/', peca);
    }

    atualizar(peca){
        return this.put(`/${peca.id}`, peca);
    }

    consultar(pecaFiltro){
        let params = `?ano=${pecaFiltro.ano}`

        if(pecaFiltro.mes){
            params = `${params}&mes=${pecaFiltro.mes}`
        }

        if(pecaFiltro.tipo){
            params = `${params}&tipo=${pecaFiltro.tipo}`
        }

        if(pecaFiltro.status){
            params = `${params}&status=${pecaFiltro.status}`
        }

        if(pecaFiltro.usuario){
            params = `${params}&usuario=${pecaFiltro.usuario}`
        }

        if(pecaFiltro.descricao){
            params = `${params}&descricao=${pecaFiltro.descricao}`
        }

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}