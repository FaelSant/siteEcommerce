import React, { Component } from 'react';
import Layout from '../components/Layout';
import Rodape from '../containers/Rodape';
import Cabecalho from '../containers/Cabecalho';

import SucessoContainer from '../containers/Sucesso';
import { Divisor } from './styles/Components/Components';

export default class Sucesso extends Component {

    render(){
        return(
            <Layout title="Loja Zellus - Moda e estilo." > 
                <Cabecalho  />
                <Divisor height="50px" />
                <SucessoContainer />
                <Rodape />
            </Layout>
        )
    }
}