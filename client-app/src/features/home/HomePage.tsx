import { Button, Container, Divider, Header, Icon } from "semantic-ui-react";
import { Logo } from "../../components/logo/Logo";
import './index.scss';
import { NavLink } from "react-router-dom";

export const HomePage = () => {
    return (
        <div className="home">
            <Container>
                <Header as='h1'>
                    <Logo size="mini"></Logo>
                    Reactivies
                </Header>
                <div>
                    <Button inverted as={NavLink} to='/login'>Login</Button>
                    <Button inverted as={NavLink} to='/register'>Register!</Button>
                </div>
                <Divider horizontal>OR</Divider>
                <Button color="facebook">
                    <Icon name="facebook"></Icon>
                    Login with Facebook
                </Button>
            </Container>
        </div>
    );
}