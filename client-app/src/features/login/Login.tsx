import { observer } from "mobx-react-lite";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Header, Message } from "semantic-ui-react";
import { LoginModel } from "../../models/login.model";
import { useAuthStore } from "../../stores/store";
import './index.scss';


const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginModel>({
    userName: '', 
    password: ''
  });

  const {isLoading, 
    loggedIn, 
    login, 
    isAlreadyLoggedIn
  } = useAuthStore();

  const navigate = useNavigate();

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.currentTarget;

    setLoginInfo((item: LoginModel) =>  {
        return {...item, [name]: value}
    });
  }

  const onLogin = async () => {
    if (loginInfo) {
      await login(loginInfo);
    }
  }

  useEffect(() => {
    if (isAlreadyLoggedIn()) {
      navigate('/activities');
    }
  }, [isAlreadyLoggedIn]);

  useEffect(() => {
    if (loggedIn === true) {
      setTimeout(() => {
        navigate('/activities');
      }, 300);
    }
  }, [loggedIn, navigate]);

  const renderSucessLoginMessage = () => {
    return <Form success>
    <Message success
      header={'Login was successful'}
      content={'Welcome you back to Reactivities'}
    ></Message>
  </Form>
  }

  const renderFailLoginMessage = () => {
    return <Form error>
      <Message error
        header={'Login was failed'}
        content={'Invalid username or password'}
      ></Message>
    </Form>
  }

  const renderLoginMessage = () => {
    if (loggedIn === true) return renderSucessLoginMessage();
    else if (loggedIn === false) return renderFailLoginMessage();
    else return <></>
  }

  return (
    <div className="form-container login">
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
                <Button positive fluid onClick={onLogin} loading={isLoading}>
                    Login
                </Button>
            </Form>
            { renderLoginMessage() }
            <p>You don't have account? Register!</p>
        </Container>
    </div>
  )
}

export default observer(Login);