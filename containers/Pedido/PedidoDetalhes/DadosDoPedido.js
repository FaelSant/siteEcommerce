import React, { Component } from 'react';
import TextoDados from '../../../components/Texto/Dados';
import TabelaSimples from '../../../components/Tabela/Simples';
import {codigosCorreios, formatMoney} from '../../../utils';
import { connect } from 'react-redux';
import moment from 'moment';

class DadosDoPedido extends Component {

    renderDadosDoCliente(){
        const { pedido } = this.props;
        if(!pedido) return null;
        const { cliente } = pedido;
        return(
            <div className="flex-3">
                <h4 className="dados-do-cliente">Dados do Cliente</h4>
                <br/>
                <TextoDados chave="Nome" valor={cliente.nome} />
                <TextoDados chave="CPF" valor={cliente.cpf} />
                <TextoDados chave="Telefone" valor={cliente.telefones[0]} />
                <TextoDados chave="Data de Nascimento" valor={moment(cliente.dataDeNascimento).format("DD/MM/YYYY")} />
            </div>
        )
    }

    renderDadosDoCarrinho(){
        const { pedido } = this.props;
        if(!pedido) return null;
        const { carrinho } = pedido;
        const dados = [];
        carrinho.forEach((item) => {
            dados.push({
                "Produto": item.produto.titulo + " - " + item.variacao.nome,
                "Preço Und.": formatMoney(item.precoUnitario),
                "Quantidade": item.quantidade,
                "Preço Total": formatMoney(item.precoUnitario * item.quantidade)
            });
        });
        return(
            <div className="flex-5">
            <h4 className="headline">Carrinho</h4>
            <br/>
            <TabelaSimples
                cabecalho={[ "Produto", "Preço Und.", "Quantidade", "Preço Total" ]}
                dados={dados} />
        </div>
        )
    }

    renderDadosDeEntrega(){
        const { pedido } = this.props;
        if(!pedido) return null;
        const { entrega } = pedido;
        return(
            <div className="flex-3">
                <h4 className="headline">Dados de Entrega</h4>
                <br/>
                <TextoDados chave="Endereço" valor={entrega.endereco.local} />
                <TextoDados chave="Número" valor={entrega.endereco.numero} />
                <TextoDados chave="Bairro"  valor={entrega.endereco.bairro}/>
                <TextoDados chave="Complemento" valor={entrega.endereco.complemento || ""} />
                <TextoDados chave="Cidade" valor={entrega.endereco.cidade} />
                <TextoDados chave="Estado" valor={entrega.endereco.estado} />
                <TextoDados chave="CEP" valor={entrega.endereco.CEP} />
                <br/>
                <TextoDados chave="Código de Rastreio" valor={entrega.codigoRastreamento || "..."} />

            </div>
        )
    }

    renderDadosDePagamento(){
        const { pedido } = this.props;
        if(!pedido) return null;
        const { entrega, pagamento } = pedido;
        return(
            <div className="flex-5">
                <h4 className="headline">Dados de Pagamento</h4>
                <br/>
                <TextoDados 
                    chave="Taxa de Entrega" 
                    valor={`${formatMoney(entrega.custo)} (${codigosCorreios[entrega.tipo]} - ${entrega.prazo} dias para entrega )`}/>
                <TextoDados chave="Valor do Pedido" valor={formatMoney(pagamento.valor - entrega.custo)} />
                <TextoDados chave="Valor Total" valor={formatMoney(pagamento.valor)} />
                <TextoDados chave="Forma de Pagamento" valor={`${pagamento.forma === "boleto" ? "Boleto" : "Cartão de Crédito"} - ${pagamento.parcelas} x`} />
            </div>
        )
    }


    render(){
        return(
            <div className="Detalhes-Do-Pedido">
                <div className="flex horizontal">
                    { this.renderDadosDoCliente() }
                    { this.renderDadosDoCarrinho() }
                </div>
                <div className="flex horizontal">
                    { this.renderDadosDeEntrega() }
                    { this.renderDadosDePagamento() }
                </div>
            </div>
        )
    }
}

const mapStateToProps =state=> ({
    pedido: state.pedido.pedido,
    cliente: state.cliente.cliente
})

export default connect(mapStateToProps)(DadosDoPedido);