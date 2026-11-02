import { useEffect } from 'react';
import { RvPage } from './rv/Site';
import { initMotion } from './rv/motion';
import './rv/rv.css';

// Previous design lives in src/components (untouched). This page is the editorial redesign in src/rv.
export const Page = RvPage;

export default function App() {
  useEffect(() => initMotion(), []);
  return <RvPage />;
}
