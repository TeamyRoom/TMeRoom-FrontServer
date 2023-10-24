import React, {useState, memo} from "react";
import classNames from "classnames";


import styles from "./controlbar.module.scss";
import muteIcon from "../../assets/mute.png";
import volumeIcon from "../../assets/volume.png";

const Controlbar = ({videoElement, hlsButtonClick}) => {

    const [volumeClicked, setVolumeClicked] = useState(false);
    const playControlClassProps = classNames(styles.playWrapper, {
        [styles.fadeIn]: true
    });
    const controlBarClassProps = classNames(styles.controlBar, {
        [styles.fadeIn]: true
    });

    const handleVolume = () => {
        if (volumeClicked) {
            if (videoElement) {
                videoElement.muted = true;
            }
            setVolumeClicked(false);
        } else {
            if (videoElement) {
                videoElement.muted = false;
            }
            setVolumeClicked(true);
        }
    }



    return (
        <>
            <div className={controlBarClassProps}>
                <img
                className={styles.volume}
                src={volumeClicked ? volumeIcon : muteIcon}
                onClick={handleVolume}
                />
                <button
                className={styles.text}
                onClick={hlsButtonClick}
                >Replay</button>
            </div>
            <div className={playControlClassProps}>
                <div className={styles.playBg}>
                </div>
            </div>
        </>
    );
};

export default memo(Controlbar);