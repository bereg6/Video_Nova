import React, {useEffect} from "react"
import "../style.css"
import Field from "../../../primitives/field/field"
import Button from "../../../primitives/button/button"
import {connect, useDispatch} from "react-redux"
import {
    auth,
    funcSignInName,
    funcSignInPass,
    showAlert,
    showSignUp,
} from "../../../redux/actions"
import Alert from "../../../primitives/field/alert"
import {useHideForm} from "../../../hooks/customHooks"

function SignIn({alert, auth, showAlert, signInName, signInPass, showSignUp}) {
    const dispatch = useDispatch()
    useHideForm("signIn")

    useEffect(() => {
        const thisName = document.getElementById("name")
        thisName.value = signInName
        const thisPassword = document.getElementById("password")
        thisPassword.value = signInPass
        thisName.oninput = () => dispatch(funcSignInName(thisName.value))
        thisPassword.oninput = () => dispatch(funcSignInPass(thisPassword.value))
    }, [signInName, signInPass])

    function funcSignIn() {
        if (signInName !== "" || signInPass !== "") {
            let data = {
                username: signInName,
                password: signInPass
            }
            dispatch(auth(data))
        } else {
            dispatch(showAlert("Fields can't be empty."))
        }
    }

    return(
        <div className="form" id={"signIn"}>
            <div className="form__heading">
                <h1 style={{paddingRight: "10px"}}>Sign</h1>
                <h1 style={{color: "#FF6363"}}>In</h1>
            </div>
            {alert && <Alert text={alert}/>}
            <Field id={"name"} label={"Name"}/>
            <Field id={"password"} label={"Password"}/>
            <div className="form__button">
                <Button text={"Sign In"} onClick={funcSignIn}/>
            </div>
            <div className="form__footer">
                <span>Already have an account?</span>
                <span style={{color: "#5B4DFF", paddingLeft: "10px", cursor: "pointer"}} onClick={showSignUp}>
                    Sign Up
                </span>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        alert: state.app.alert,
        signIn: state.app.signIn,
        signInName: state.forms.signInName,
        signInPass: state.forms.signInPass,
    }
}
const mapDispatchToProps = {
   auth, showAlert, showSignUp, funcSignInPass, funcSignInName
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)