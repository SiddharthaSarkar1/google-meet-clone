import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import styles from '@/styles/home.module.css';
import { useEffect, useRef, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const [roomID, setRoomID] = useState('');
  const inputRef = useRef(null);

  const createAndJoin = () => {
    const roomID = uuidv4();
    router.push(`/${roomID}`);
  }

  const joinRoom = () => {
    if (roomID) router.push(`/${roomID}`);
    else {
      alert("Please provide a valid Room ID!");
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [])
  


  return (
    <div className={styles.wrapperfull}>
      <div className={styles.homeContainer}>
        <h1>Video calls and meetings for everyone</h1>
        <h3>Connect, collaborate and celebrate from anywhere with </h3>
        <div className={styles.enterRoom}>
          <input ref={inputRef} type="text" placeholder="Enter a room id" value={roomID} onChange={(e) => setRoomID(e?.target.value)} />
          <div className={styles.buttonContainer}>
            <button onClick={joinRoom}>Join Room</button>
            <button className={styles.buttonB} onClick={createAndJoin}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video-icon lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
              Create a new room</button>
          </div>
        </div>
        {/* <span className={styles.seperatorText}>-----------OR-----------</span> */}



      </div>
    </div>
  )
}
