import { Button, Container, Divider, Header, Icon } from "semantic-ui-react";
import { Logo } from "../../components/logo/Logo";
import './index.scss';

export const HomePage = () => {
    return (
        <div className="home-container">
            <Header as='h1' className="header">
                <Logo size="mini"></Logo>
                Reactivies
            </Header>
            <div>
                <Button basic>Login</Button>
                <Button basic>Register!</Button>
                <Divider horizontal>OR</Divider>
                <Button color="facebook">
                    <Icon name="facebook"></Icon>
                    Login with Facebook
                </Button>
            </div>
        </div>
    );
}