import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // I use the real store here - we might want to stub/mock it (ecpecially the external calls)
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
