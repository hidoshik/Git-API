import { createRoot } from 'react-dom/client';
import init from './init';
import './index.css';

const runApp = async () => {
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  const app = await init();

  root.render(app);
};

runApp();
