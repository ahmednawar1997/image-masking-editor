import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

import { MantineProvider, createTheme } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={createTheme({})}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
