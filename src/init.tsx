import App from './App';
import { Provider } from 'react-redux';
import store from './slices/store';

const init = async () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
