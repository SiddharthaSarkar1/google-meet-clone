import { useSocket } from '@/context/socket';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const socket = useSocket();

  useEffect(() => {
    socket?.on('connect', () => {
      console.log(socket.id);
    })
  }, [socket]);
  

  return (
    <h1>Welcome Sidd</h1>
  )
}
