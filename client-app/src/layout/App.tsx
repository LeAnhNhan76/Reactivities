import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';

const App = () => {
    return (
        <div className='root-container'>
            <Outlet />
            <Spinner />
        </div>
    );
}
export default observer(App);
