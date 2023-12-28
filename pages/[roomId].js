import Player from "@/components/Player";
import { useSocket } from "@/context/socket";
import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import { useEffect } from "react";

const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const {stream} = useMediaStream();

  useEffect(() => {
    if(!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log(`User connected in rooms with userID ${newUser}`);

      const call = peer.call(newUser, stream);
    }
    socket.on("user-connected", handleUserConnected);
    return () => {
      socket.off("user-connected", handleUserConnected);
    }
  }, [socket]);

  return(
    <div className="">
      <Player url={stream} muted playing playerID={myId} />
    </div>
  )

};

export default Room;
