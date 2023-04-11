import { FormEvent, useState } from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";
import './index.scss';
import { LoginModel } from "../../models/login.model";
import agent from "../../api/agent";

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

  const onLogin = async () => {
    if (loginInfo) {
      const loginResult = await agent.Account.login(loginInfo);
      console.log('loginResult', loginResult);
    }
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
                    type="password"
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