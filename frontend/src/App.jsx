import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css'
import ChatLayout from './layout/ChatLayout';
import Chat from './components/Chat';
import { ChatProvider } from './store/ChatContex';


function App() {

  return (
    <BrowserRouter>
      <ChatProvider>
        <div className='nin-h-screen bg-gray-100 '>
          <Routes>
            <Route path="/" element={<ChatLayout />} >
              <Route path="/" element={<Chat />} />
              <Route path="/conversation/:id" element={<Chat />} />
            </Route>
          </Routes>
        </div>
      </ChatProvider>
    </BrowserRouter>
  )
}

export default App
