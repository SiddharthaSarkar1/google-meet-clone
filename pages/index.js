import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import styles from '@/styles/home.module.css';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const [roomID, setRoomID] = useState('');

  const createAndJoin = () => {
    const roomID = uuidv4();
    router.push(`/${roomID}`);
  }

  const joinRoom = () => {
    if(roomID) router.push(`/${roomID}`);
    else {
      alert("Please provide a valid Room ID!");
    }
  }
  

  return (
    <div className={styles.homeContainer}>
      <h1>Google Meet Clone</h1>
      <div className={styles.enterRoom}>
        <input type="text" placeholder="Enter room ID" value={roomID} onChange={(e) => setRoomID(e?.target.value)} />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <span className={styles.seperatorText}>-----------OR-----------</span>
      <button onClick={createAndJoin}>Create a new room</button>
    </div>
  )
}
