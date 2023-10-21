//react
import App from './App';
import ReactDOM from 'react-dom/client';
//react-router-dom
import { BrowserRouter} from 'react-router-dom';
//react-redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

const rootElem = document.getElementById('root')

// const root = ReactDOM.createRoot();

if(rootElem){
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}


