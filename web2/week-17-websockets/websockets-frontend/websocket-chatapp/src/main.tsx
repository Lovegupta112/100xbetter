import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import ChatContextProvider from './context/ChatContext.tsx';

createRoot(document.getElementById('root')!).render(
    <ChatContextProvider>
    <App />
    </ChatContextProvider>
)
