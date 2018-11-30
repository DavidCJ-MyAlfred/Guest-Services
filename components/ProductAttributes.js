import { Header, Divider, Table } from 'semantic-ui-react'
///Atributos de los productos.
export default ({
  description,
}) => (
  <React.Fragment>
    <Header as="h3">Descripcion del servicio</Header>
    <p>{description}</p>

    <Divider />
  </React.Fragment>
)
