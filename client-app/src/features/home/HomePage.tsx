import Welcome from '../welcome/Welcome';
import './index.scss';

export const HomePage = () => {
    return (
        <div className="home">
            <Welcome></Welcome>
        </div>
    );
}