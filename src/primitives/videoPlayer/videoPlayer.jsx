import React from "react"
import "./style.css"
import {useHideForm} from "../../hooks/customHooks"

export default function VideoPlayer() {
    useHideForm("videoPlayer")
    return (
        <div className="videoPlayer" id="videoPlayer">
            <iframe id={"videoPlayerIframe"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
        </div>
    )
}