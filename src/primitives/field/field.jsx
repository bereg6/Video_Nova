import React from "react"
import "./style.css"
import PropTypes from "prop-types"
import {connect, useDispatch} from "react-redux"
import {hidePass, showPass} from "../../redux/actions"

function Field(props) {
    const dispatch = useDispatch()
    const classes = (props.label === "Description") ? `field__input field__input--${props.label.toLowerCase()}`
                    : "field__input"

    let label
    let type
    if (props.label === "Name of video" || props.label === "Name"){
        label = "name"
        type = "text"
    } else if (props.label === "Youtube Link") {
        label = "link"
        type = "url"
    } else if (props.label === "Password" || props.label === "Repeat Password") {
        type = "password"
        label = "password"
    } else if (props.label === "Description") {
        label = "description"
    }
    function activeInput() {
        document.getElementById(props.id).focus()
    }

    return(
        <div className="field">
            <h3>{props.label}</h3>
            <div className={classes} onClick={activeInput}>
                {label === "description" ?
                    <textarea id={props.id} placeholder={`Type ${label}...`}/>
                    : <div>
                        {type !== "password" ? <input id={props.id} type={type} placeholder={`Type ${label}...`}/>
                        : <div>
                                {!props.visiblePass ? <div className="field__input--pass">
                                        <input id={props.id} type={type} placeholder={`Type ${label}...`}/>
                                    <div style={{position: "relative"}} onClick={async event => dispatch(showPass())}>
                                        <img style={{width: "24px", height: "24px"}} src={"../images/eye.png"} alt={""}/>
                                        <span></span>
                                    </div>
                                    </div>
                                : <div className="field__input--pass">
                                <input id={props.id} type={"text"} placeholder={`Type ${label}...`}/>
                                <div onClick={async event => dispatch(hidePass())}>
                                    <img style={{width: "24px", height: "24px"}} src={"../images/eye.png"} alt={""}/>
                                </div>
                                </div>}
                            </div>
                        }
                    </div>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        visiblePass: state.app.visiblePass,
    }
}
const mapDispatchToProps = {
    showPass, hidePass,
}
export default connect(mapStateToProps, mapDispatchToProps)(Field)


Field.propTypes = {
    label: PropTypes.string.isRequired,
}