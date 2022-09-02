import React from "react"
import "./style.css"

export default function Alert({text}) {
    return(
        <div className="alert">{text}</div>
    )
}