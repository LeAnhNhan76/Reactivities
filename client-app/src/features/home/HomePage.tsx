import { Button, Container, Divider, Icon } from "semantic-ui-react";

export const HomePage = () => {
    return (
        <Container style={{marginTop: '7em'}}>
            <div>
                <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}} />
                <span>Reactivities</span>
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