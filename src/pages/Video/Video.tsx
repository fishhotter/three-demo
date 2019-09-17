// 3d动态旋转动画
import * as React from "react";

import "video.js/dist/video-js.min.css";
// tslint:disable-next-line:no-import-side-effect
import "video.js/dist/video.min.js";
function Video(props:any){
    return (
        <video id="example_video_1" className="video-js" controls={true} preload="none" width="640" height="264" poster="http://vjs.zencdn.net/v/oceans.png" data-setup="{}">
            <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        </video>
    )

}

export default Video;