import { Button, Container, Divider, Header, Icon } from "semantic-ui-react"
import { Logo } from "../../components/logo/Logo"
import { NavLink, useNavigate } from "react-router-dom"

const Welcome = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login", {replace: true});
  }

  return (
    <Container>
        <Header as='h1'>
            <Logo size="mini"></Logo>
            Reactivies
        </Header>
        <div>
            <Button inverted onClick={onLogin}>Login</Button>
            <Button inverted as={NavLink} to='/register'>Register!</Button>
        </div>
        <Divider horizontal>OR</Divider>
        <Button color="facebook">
            <Icon name="facebook"></Icon>
            Login with Facebook
        </Button>
    </Container>
  )
}

export default Welcome