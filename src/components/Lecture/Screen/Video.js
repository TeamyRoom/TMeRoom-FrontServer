import classNames from "classnames";
import React, { memo, useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import styles from "./video.module.scss";
import Controlbar from "./Controlbar.js";

const Video = forwardRef((props, ref) => {

    const [audioOn, setAudioOn] = useState(true);

    const videoElement = ref.current;

    const classProps = classNames(styles.video, props.className);

    useImperativeHandle(ref, () => ({
        handleAudio,
    }));

    const handleAudio = () => {
        setAudioOn(!audioOn);
    }

    return (
        <div className="styles.default">
            <video className={classProps} muted={audioOn} ref={props.videoref} playsInline={true} autoPlay={true} />
            <Controlbar videoElement={videoElement} hlsButtonClick={props.hlsButtonClicked}
            />
        </div>
    );
});

export default memo(Video);