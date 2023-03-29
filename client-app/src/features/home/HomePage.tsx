import { Button, Container, Divider, Header, Icon } from "semantic-ui-react";
import { Logo } from "../../components/logo/Logo";
import './index.scss';

export const HomePage = () => {
    return (
        <Container style={{marginTop: '7em'}}>
            <div className="header">
                <Logo size="tiny" classNames={'logo'}></Logo>
                <Header as={'h2'}>Reactivities</Header>
            </div>
            <div>
                <Button basic>Login</Button>
                <Button basic>Register!</Button>
                <Divider horizontal>OR</Divider>
                <Button color="facebook">
                    <Icon name="facebook"></Icon>
                    Login with Facebook
                </Button>
            </div>
        </Container>
    );
}