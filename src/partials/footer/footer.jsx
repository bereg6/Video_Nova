import React from "react"
import "./style.css"
import Logo from "../../primitives/logo/logo";

export default function Footer() {
    return(
        <div className="footer" id="footer">
            <div className="footer__logo">
                <Logo />
            </div>
            <span>All Rights Reserved 2022</span>
            <div className="social">
                <div className={"social__item"}>
                    <a href={"https://web.telegram.org"} target="_blank" rel="noreferrer"> </a>
                    <img src={"../images/Telegram.png"} alt="" />
                </div>
                <div className={"social__item"}>
                    <a href={"https://discord.com"} target="_blank" rel="noreferrer"> </a>
                    <img src={"../images/Discord.png"} alt="" style={{height: "27px"}} />
                </div>
                <div className={"social__item"}>
                    <a href={"https://twitter.com/"} target="_blank" rel="noreferrer"> </a>
                    <img src={"../images/Twitter.png"} alt="" />
                </div>
            </div>
        </div>
    )

}