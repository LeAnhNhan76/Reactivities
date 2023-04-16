import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import { HomePage } from '../features/home/HomePage';
import NavBar from '../components/nav/NavBar';
import { Container } from 'semantic-ui-react';

const App = () => {
    const location = useLocation();
    return (
        <div className='root-container'>
            <div className='page-container'>
                { location.pathname === '/'  ? <HomePage></HomePage> :
                  <>
                    <NavBar></NavBar>
                    <Container className='main-body'>
                        <Outlet></Outlet>
                    </Container>
                  </>
                }
            </div>
            <Spinner></Spinner>
        </div>
    );
}
export default observer(App);
