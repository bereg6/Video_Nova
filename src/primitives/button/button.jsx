import React from "react"
import "./style.css"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import Loading from "../loading/loading"

export default function Button(props){
    const transparentClass = !props.transparent ? "button button--blue" : "button button--transparent"
    const classes = !props.disabled ? transparentClass : `${transparentClass} button--disabled`
    return <div className={classes} onClick={props.onClick}>{props.text}
        {props.loading ? <div><Loading size={"small"}/></div> : ""}
        {props.id || props.id === 0 ? <Link to={`/profile/${props.id}`} style={{
            position: "absolute", left: "0", right: "0",
            bottom: "0", top: "0"
        }}/> : ""}
    </div>
}

Button.propTypes = {
    transparent: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    text: PropTypes.string.isRequired,
}

Button.defaultProps = {
    transparent: false,
    disabled: false,
    loading: false,
}