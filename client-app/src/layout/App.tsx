import { observer } from 'mobx-react-lite';
import { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Spinner from '../components/spinner/Spinner';
import NavBar from '../features/nav/NavBar';

const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
      <Fragment>
        {isLoggedIn && <NavBar />} 
        <Container style={{ marginTop: "7em" }}>
          <Outlet />
        </Container>
        <Spinner />
      </Fragment>
    );
}
export default observer(App);
