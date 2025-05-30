import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const ChatLayout = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />

      <main>
        <Outlet />
      </main>
      
    </div>
  )
}

export default ChatLayout