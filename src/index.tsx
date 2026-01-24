import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

import './styles/global.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter
    basename={import.meta.env.BASE_URL}
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <App />
  </BrowserRouter>,
);
