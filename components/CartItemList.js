import Link from 'next/link'
import { Item, Button, Loader, Message } from 'semantic-ui-react'

export default ({ items, removeFromCart, loading, completed }) => {
  if (loading) return <Loader active inline="centered" />

  if (completed)
    return (
      <Message success>
        <p>Su pedido y pago han sido aceptados.</p>
      </Message>
    )

  if (items.length === 0)
    return (
      <Message warning>
        <Message.Header>Tu carro esta vacío</Message.Header>
        <p>
        Deberás agregar algunos artículos al carro antes de que pueda realizar el pago.
        </p>
      </Message>
    )

  const mapCartItemsToItems = items =>
    items.map(({ id, product_id, name, quantity, meta, image }) => {
      const price = meta.display_price.with_tax.unit.formatted || ''
      const imageUrl = image.href || '/static/moltin-light-hex.svg'

      return {
        childKey: id,
        header: (
          <Link href={`/product?id=${product_id}`} passHref>
            <Item.Header as="a">{name}</Item.Header>
          </Link>
        ),
        image: imageUrl,
        meta: `${quantity}x ${price}`,
        extra: (
          <Button
            basic
            icon="remove"
            floated="right"
            onClick={() => removeFromCart(id)}
          />
        )
      }
    })

  return <Item.Group divided items={mapCartItemsToItems(items)} />
}
