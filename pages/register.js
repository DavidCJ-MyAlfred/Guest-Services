import Router from 'next/router'
import { Header, Form, Input, Button, Segment } from 'semantic-ui-react'
///** Importacion de componentes **///
import Layout from '../components/Layout'

import { register } from '../lib/moltin'

export default class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    loading: false
  }

  _handleSubmit = async e => {
    e.preventDefault()

    const { name, email, password } = this.state

    this.setState({
      loading: true
    })
    ///Validacion registro
    try {
      const { id, token } = await register({ name, email, password })
      localStorage.setItem('customerToken', token)
      localStorage.setItem('mcustomer', id)
      Router.push('/myaccount')
    } catch (e) {
      this.setState({
        loading: false
      })
    }
  }

  _handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value })

  render() {
    const { loading } = this.state

    return (
      /// Formulario
      <Layout title="Crear Usuario">
        <Header as="h1">Crea tu usuario</Header>

        <Form onSubmit={this._handleSubmit} loading={loading}>
          <Segment>
            <Form.Field>
              <label>Nombre</label>
              <Input
                fluid
                placeholder="Ingrese su nombre"
                name="name"
                autoFocus
                onChange={e => this._handleChange(e)}
              />
            </Form.Field>

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
              Registrar
            </Button>
            
          </Segment>
        </Form>
      </Layout>
    )
  }
}
