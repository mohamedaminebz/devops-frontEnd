/* eslint-disable */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';
import {ReactQueryDevtools} from "react-query/devtools";
import {QueryClient, QueryClientProvider} from "react-query";
// project import
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); 

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      {/* <BrowserRouter basename="/project/booking">
      <QueryClientProvider client={queryClient}>
          <App/> 
          <ReactQueryDevtools initialIsOpen /> 
        </QueryClientProvider>
      </BrowserRouter> */}
      <h1>hellooooooooo world</h1>
    </ReduxProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
