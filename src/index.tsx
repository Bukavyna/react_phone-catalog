import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';

import './styles/global.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter
    // basename={import.meta.env.BASE_URL}
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <App />
  </HashRouter>,
);
