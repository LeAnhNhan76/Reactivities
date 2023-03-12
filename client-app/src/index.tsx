import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import './layout/styles.css';
import reportWebVitals from './reportWebVitals';
import { router } from './router/Routes';
import { store, StoreContext } from './stores/store';

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <RouterProvider 
      router={router}></RouterProvider>
  </StoreContext.Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
