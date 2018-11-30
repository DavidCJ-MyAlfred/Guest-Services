import Router from 'next/router'
///** Importacion de componentes **///
import Layout from '../components/Layout'
import OrderItemList from '../components/OrderItemList'

import { getOrders } from '../lib/moltin'

export default class MyAccount extends React.Component {
  state = {
    loading: true,
    orders: []
  }

  async componentDidMount() {
    const token = localStorage.getItem('customerToken')

    if (!token) {
      Router.push('/login')
    }

    const { json: { data, included, meta } } = await getOrders(token)

    // Mapeo de ordenes
    const orders = data.map(order => {

      return {
        ...order
      }
    })
    console.log(orders)

    this.setState({
      loading: false,
      orders,
      included,
      meta
    })

    console.log(data)
  }

  render() {
    return (
      <Layout title="Mi Cuenta">
        <OrderItemList {...this.state} />
      </Layout>
    )
  }
}
