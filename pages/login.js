import Router from 'next/router'
import {
  Header,
  Form,
  Input,
  Button,
  Segment,
  Message
} from 'semantic-ui-react'
///** Importacion de componentes **///
import Layout from '../components/Layout'
import { login } from '../lib/moltin'

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
    errors: null
  }

  _handleSubmit = async e => {
    e.preventDefault()

    const { email, password } = this.state

    this.setState({
      loading: true,
      errors: null
    })

    try {
      /// Validacion de logeo
      const { id, token } = await login({ email, password })
      localStorage.setItem('customerToken', token)
      localStorage.setItem('mcustomer', id)
      Router.push('/myaccount')
    } catch (e) {
      console.log(e.message)
      this.setState({
        loading: false,
        errors: e
      })
    }
  }

  _handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value })

  render() {
    const { loading, errors } = this.state

    return (
      <Layout title="Iniciar Sesión">
        <Header as="h1">Ingrese a su cuenta</Header>

        <Form onSubmit={this._handleSubmit} loading={loading} error={!!errors}>
          <Message
            error
            header="Error"
            content="
            Por favor, compruebe sus datos de inicio de sesión y vuelva a intentarlo."
          />

          <Segment>
            <Form.Field>
              <label>Correo electronico</label>
              <Input
                fluid
                placeholder="Ingrese su correo"
                name="email"
                type="email"
                onChange={e => this._handleChange(e)}
              />
            </Form.Field>

            <Form.Field>
              <label>Contraseña</label>
              <Input
                fluid
                placeholder="Ingrese su contraseña"
                name="password"
                type="password"
                onChange={e => this._handleChange(e)}
              />
            </Form.Field>

            <Button type="submit" color="green">
              Iniciar sesión
            </Button>
          </Segment>
        </Form>
      </Layout>
    )
  }
}