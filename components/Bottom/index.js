import cx from "classnames";
import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";

import styles from "@/components/Bottom/index.module.css";

const Bottom = (props) => {
  const { muted, playing, toggleAudio, toggleVideo } = props;

  return (
    <div className={styles.bottomMenu}>
      {muted ? (
        <MicOff
          className={cx(styles.icon, styles.active)}
          size={55}
          onClick={toggleAudio}
        />
      ) : (
        <Mic className={styles.icon} size={55} onClick={toggleAudio} />
      )}
      {playing ? (
        <Video className={styles.icon} size={55} onClick={toggleVideo} />
      ) : (
        <VideoOff
          className={cx(styles.icon, styles.active)}
          size={55}
          onClick={toggleVideo}
        />
      )}
      <PhoneOff className={styles.icon} size={55} />
    </div>
  );
};

export default Bottom;