import React from "react"
import "./style.css"

export default function Loading(props) {
    return (
        <div className={`lds-ring lds-ring__${props.size}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}