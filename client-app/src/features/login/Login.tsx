import { FormEvent, useState } from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";
import './index.scss';

export interface LoginModel {
    userName: string;
    password: string;
}

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginModel>({
    userName: '', 
    password: ''
  });

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.currentTarget;

    setLoginInfo((item: LoginModel) =>  {
        return {...item, [name]: value}
    });
  }

  const onLogin = () => {
    
  }

  return (
    <div className="form-container">
        <Container>
            <Header as='h2'>
                Login to Reactivities
            </Header>
            <Form>
                <Form.Input
                    name="userName"
                    placeholder="Username"
                    onChange={handleInputChange}
                    value={loginInfo?.userName}
                />
                <Form.Input 
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={loginInfo?.password}
                />
                <Button positive fluid onClick={onLogin}>
                    Login
                </Button>
            </Form>
            <p>You don't have account? Register!</p>
        </Container>
    </div>
  )
}

export default Login;