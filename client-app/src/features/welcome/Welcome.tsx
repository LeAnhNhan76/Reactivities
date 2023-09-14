import { Button, Container, Divider, Header, Icon } from "semantic-ui-react";
import { Logo } from "../../components/logo/Logo";
import { useModalStore } from "../../stores/store";
import Login from "../login/Login";

const Welcome = () => {
  const {openModal} = useModalStore();

  const onLogin = () => {
    openModal(<Login></Login>)
  }

  const onRegister = () => {
    console.log('Registered!')
  }

  return (
    <Container>
        <Header as='h1'>
            <Logo size="mini"></Logo>
            Reactivies
        </Header>
        <div>
            <Button inverted onClick={onLogin}>Login</Button>
            <Button inverted onClick={onRegister}>Register!</Button>
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