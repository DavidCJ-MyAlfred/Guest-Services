import StripeCheckout from 'react-stripe-checkout'
import { Button, Segment, Divider } from 'semantic-ui-react'

export default ({
  handleCheckout,
  display_price: {
    with_tax: { amount, currency, formatted }
  }
}) => (
  <React.Fragment>
    <Divider />
    <Segment clearing size="small">
      <strong>Sub total:</strong> {formatted}
      <StripeCheckout
        name="My Alfred"
        amount={amount}
        currency={currency}
        stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
        shippingAddress={false}
        billingAddress={true}
        zipCode={true}
        token={handleCheckout}
        reconfigureOnUpdate={false}
        triggerEvent="onClick"
      >
        <Button color="green" floated="right">
          Validar compra
        </Button>
      </StripeCheckout>
    </Segment>
  </React.Fragment>
)
