import React from "react"
import "./style.css"
import PropTypes from "prop-types"

export default function Video(props) {
    const url = props.src.split("/")
    const preUrl = url.pop().split("=").pop()

    return(
        <div className="video">
            <iframe className="video__iframe"
                src={`https://youtube.com/embed/${preUrl}?autoplay=1`}
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}
                    html,body{height:100%}
                    img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}
                    span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}
                </style>
                    <a href=https://youtube.com/embed/${preUrl}?autoplay=1>
                    <img src="https://img.youtube.com/vi/${preUrl}/hqdefault.jpg" alt='Demo video'>
                    <span>▶</span>
                    </a>`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
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