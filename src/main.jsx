import { createRoot } from 'react-dom/client';
import App from './App';

// No StrictMode: its dev-only double-mount would run the motion effects (observers, listeners) twice.
// #root may hold build-time prerendered markup (for crawlers); the client render replaces it.
createRoot(document.getElementById('root')).render(<App />);
