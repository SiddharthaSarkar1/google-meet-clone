import Player from "@/components/Player";
import { useSocket } from "@/context/socket";
import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { cloneDeep } from "lodash";

import styles from "@/styles/room.module.css";
import Bottom from "@/components/Bottom";
import CopySection from "@/components/CopySection";

const Room = () => {
  const socket = useSocket();
  const roomId = useRouter().query.roomId;
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();

  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId, peer);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log(`User connected in rooms with userID ${newUser}`);
      const call = peer.call(newUser, stream);
      call.on("stream", (incomingStream) => {
        console.log(`Incoming Stream from ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));
        setUsers((prev) => ({
          ...prev,
          [newUser]: call,
        }));
      });
    };
    socket.on("user-connected", handleUserConnected);
    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [socket, setPlayers, peer, stream]);

  useEffect(() => {
    //This use effect will deal with all the control panel stuff
    if (!socket) return;
    const handleToggleAudio = (userId) => {
      console.log(`User with id ${userId} toggled audio.`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      console.log(`User with id ${userId} toggled video.`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId) => {
      console.log(`User ${userId} is leaving the room.`);
      users[userId]?.close();
      const playersCopy = cloneDeep(players);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    }
    

    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);

    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
    };
  }, [setPlayers, socket, users]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);
      call.on("stream", (incomingStream) => {
        console.log(`Incoming Stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev, 
          [callerId]: call
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`Setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);

  return (
    <>
      <div className={styles.activePlayerContainer}>
        {playerHighlighted && (
          <Player
            url={playerHighlighted.url}
            muted={playerHighlighted.muted}
            playing={playerHighlighted.playing}
            isActive
          />
        )}
      </div>
      <div className={styles.inActivePlayerContainer}>
        {Object.keys(nonHighlightedPlayers).map((playerId) => {
          const { url, muted, playing } = nonHighlightedPlayers[playerId];
          return (
            <Player
              key={playerId}
              url={url}
              muted={muted}
              playing={playing}
              isActive={false}
            />
          );
        })}
      </div>
      <CopySection roomId={roomId} />
      <Bottom
        muted={playerHighlighted?.muted}
        playing={playerHighlighted?.playing}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        leaveRoom={leaveRoom}
      />
    </>
  );
};

export default Room;
