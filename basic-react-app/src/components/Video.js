import classNames from "classnames";
import React, { memo, useEffect, useRef, useState} from "react";
import styles from "./video.module.scss";
import Controlbar from "./Controlbar.js";

const Video = ({className, videoref, hlsButtonClicked}) => {
    const ref = useRef(videoref);

    const videoElement = ref.current;

    const classProps = classNames(styles.video, className);

    return (
        <div className="styles.default">
            <video className={classProps} muted={true} ref={videoref} playsInline={true} autoPlay={true}>
            </video>
            <Controlbar videoElement={videoElement} hlsButtonClick={hlsButtonClicked}
            />
        </div>
    );
};

export default memo(Video);