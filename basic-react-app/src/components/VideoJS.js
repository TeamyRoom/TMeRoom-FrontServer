import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';


export const VideoJS = (props) => {
const videoRef = React.useRef(null);
const playerRef = React.useRef(null);
const {options, onReady} = props;


React.useEffect(() => {


// Make sure Video.js player is only initialized once
if (!playerRef.current) {
// The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
    const videoElement = document.createElement("video-js");

    videoElement.classList.add('vjs-big-play-centered');
    videoRef.current.appendChild(videoElement);

    const player = playerRef.current = videojs(videoElement, options, () => {
    videojs.log('player is ready');
    onReady && onReady(player);
});

let Button = videojs.getComponent("button");

class SettingsButton extends Button {
    constructor(player, options) {
        super(player, options);
        this.controlText("ToLive");
        // ADD UNIQUE CLASS TO THE CUSTOM BUTTON
        this.addClass('vjs-visible-text');
    }
};

videojs.registerComponent("SettingsButton", SettingsButton);

player.getChild("ControlBar").addChild("SettingsButton", {}, 10);
// You could update an existing player in the `else` block here
// on prop change, for example:
} else {
    const player = playerRef.current;


    player.autoplay(options.autoplay);
    player.src(options.sources);
}
}, [options, videoRef]);


// Dispose the Video.js player when the functional component unmounts
React.useEffect(() => {
    const player = playerRef.current;

    return () => {
    if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
        }   
    };
}, [playerRef]);


return (
<div data-vjs-player>
<div ref={videoRef} />
</div>
);
}


export default VideoJS;