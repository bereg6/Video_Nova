import React from "react"
import "./style.css"
import PropTypes from "prop-types"
import {connect, useDispatch} from "react-redux"
import {showVideoPlayer} from "../../redux/actions"
import {useHideForm} from "../../hooks/customHooks"

function Video(props) {
    const dispatch = useDispatch()
    const url = props.src.split("/")
    const preUrl = url.pop().split("=").pop()
    useHideForm("videoPlayer")

    function activeVideo() {
        showPlayer()
            .then (() => {
                const block = document.getElementById("profile__wrapper")
                const blockPosition = block.getBoundingClientRect()
                const currentVideo = document.getElementById(`block_${props.id}`)
                currentVideo.classList.add("activeVideo")
                const videoInFocus = currentVideo.getBoundingClientRect()
                const videoPlayer = document.getElementById("videoPlayer")
                const scroll = window.pageYOffset
                const iframe = document.getElementById("videoPlayerIframe")
                videoPlayer.style.left = `${videoInFocus.left - blockPosition.left}px`
                videoPlayer.style.top = `${videoInFocus.top + scroll}px`
                videoPlayer.style.width = `${videoInFocus.width}px`
                videoPlayer.style.height = `${videoInFocus.height}px`
                const width = block.clientWidth * 0.8
                const height = width * 0.575
                const left = block.clientWidth / 2 - width / 2
                const top = (window.screen.height / 2 - height / 2) + window.pageYOffset
                videoPlayer.style.opacity = "1"
                videoPlayer.style.top = `${top}px`
                videoPlayer.style.left = `${left}px`
                videoPlayer.style.width = `${width}px`
                videoPlayer.style.height = `${height}px`
                setTimeout(() => {
                    iframe.src = `https://youtube.com/embed/${preUrl}?autoplay=1`
                }, 400)
            })
}

    async function showPlayer() {
        dispatch(props.showVideoPlayer())
    }

    return(
        <div className="video" onClick={activeVideo} >
            <div className="image__wrapper" id={`block_${props.id}`}>
                <div className="image">
                    <img src={`https://img.youtube.com/vi/${preUrl}/hqdefault.jpg`} alt='Demo video'/>
                </div>
                <div className="play">
                    <img src={"../images/ArrowInCircle.png"} alt={""}/>
                </div>
            </div>
            <div className="video__heading">
                <h3>{props.heading}</h3>
            </div>
            <div className="video__description">
                <p>{props.description}</p>
            </div>
        </div>
    )
}

Video.propTypes = {
    src: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
    return {
        state
    }
}
const mapDispatchToProps = {
    showVideoPlayer,
}
export default connect(mapStateToProps, mapDispatchToProps)(Video)