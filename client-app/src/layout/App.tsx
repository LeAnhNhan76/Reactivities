import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import { useState } from 'react';
import NavBar from '../features/nav/NavBar';

const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(true);

    return (
        <div className='root-container'>
            {isLoggedIn && <NavBar></NavBar>}
            {isLoggedIn && <div className='main-body'>
                <Outlet></Outlet>
              </div>}
            {!isLoggedIn && <Outlet></Outlet>}
            <Spinner />
        </div>
    );
}
export default observer(App);
