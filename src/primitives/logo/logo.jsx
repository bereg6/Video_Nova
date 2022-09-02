import React from "react"
import "./style.css"
import {useNavigate} from "react-router-dom"

export default function Logo(){
    const navigate = useNavigate()
    return(
        <div className="logo" onClick={async () => navigate("/")}>
            <img src={"../images/Logo.png"} alt={""}/>
        </div>
    )
}