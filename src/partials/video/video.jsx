import React from "react"
import "./style.css"
import PropTypes from "prop-types"
import {connect, useDispatch} from "react-redux"
import {showVideoPlayer} from "../../redux/actions"

function Video(props) {
    const dispatch = useDispatch()
    const url = props.src.split("/")
    const preUrl = url.pop().split("=").pop()

    function activeVideo() {
        showPlayer()
            .then (() => {
                const block = document.getElementById("profile__wrapper")
                const videoInFocus = document.getElementById("videoPlayer")
                const iframe = document.getElementById("videoPlayerIframe")
                const width = block.clientWidth * 0.8
                const height = width * 0.575
                const left = block.clientWidth / 2 - width / 2
                const top = (window.screen.height / 2 - height / 2) + window.pageYOffset
                videoInFocus.style.width = `${width}px`
                videoInFocus.style.height = `${height}px`
                videoInFocus.style.zIndex = "5"
                videoInFocus.style.top = `${top}px`
                videoInFocus.style.left = `${left}px`
                videoInFocus.style.background = "#000000"
                iframe.src = `https://youtube.com/embed/${preUrl}?autoplay=1`
            })
}
    async function showPlayer() {
        dispatch(props.showVideoPlayer())
    }

    return(
        <div className="video" id={`block_${props.id}`} onClick={activeVideo} >
            <div className="image__wrapper">
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