import ReactPlayer from "react-player";
import cx from "classnames";

import styles from "@/components/Player/index.module.css";

const Player = (props) => {
  const { url, muted, playing, isActive } = props;

  return (
    <div
      className={cx(styles.playerContainer, {
        [styles.notActive]: !isActive,
        [styles.active]: isActive,
      })}
    >
      <ReactPlayer url={url} muted={muted} playing={playing} height='100%' width='100%' />
    </div>
  );
};

export default Player;
