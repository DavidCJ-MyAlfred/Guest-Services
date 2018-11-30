import Link from 'next/link'
import { Header, Loader, Message } from 'semantic-ui-react'

export default ({ orders, loading, included }) => {
  if (loading) return <Loader active inline="centered" />
  /// Redirecionado al catalogo de servicios
  if (orders.length === 0) {
    return (
      <Message warning>
        <Message.Header>Sin pedidos recientes</Message.Header>
        <p>
        Cuando haces un pedido debera aparecerán aquí.{' '}
          <Link href="/">
            <a>Tienda de servicios</a>
          </Link>.
        </p>
      </Message>
    )
  }
  /// Mapeo de los productos anteriores
  return (
    <React.Fragment>
      <Header as="h1">Mis pedidos anteriores</Header>
      {orders.map(order => {
        const {
          status,
          meta,
        } = order
        const completed = status === 'complete'
        const price = meta.display_price.with_tax.formatted

      })}
    </React.Fragment>
  )
}
