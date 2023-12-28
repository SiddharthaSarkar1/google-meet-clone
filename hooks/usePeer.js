import { useState, useEffect, useRef } from "react";
import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";


const usePeer = () => {
  const socket = useSocket();
  const roomID = useRouter().query.roomID;
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);

  useEffect(() => {
    if (isPeerSet.current || !roomID || !socket) return;
    isPeerSet.current = true;
    (async function initPeer() {
      const myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);

      myPeer.on("open", (id) => {
        console.log(`Your peer id is: ${id}`);
        setMyId(id);
        socket?.emit('joined-room', roomID, id);
      });
    })();
  }, [roomID, socket]);

  return {
    peer,
    myId,
  };
};

export default usePeer;
