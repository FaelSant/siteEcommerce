import React, { Component } from "react"
import Layout from "../components/Layout"

import Cabecalho from "../containers/Cabecalho"
import CheckoutContainer from "../containers/Checkout"
import Rodape from "../containers/Rodape"

export default class Checkout extends Component {
  static async getInitialProps({ res }) {
    if (res) {
      res.writeHead(302, { Location: "/carrinho" })
      res.end()
    }
    return {}
  }

  render() {
    return (
      <Layout title="Checkout | Loja Zellus - Moda e Estilo" pagSeguro>
        <Cabecalho />
        <CheckoutContainer />
        <Rodape />
      </Layout>
    )
  }
}
