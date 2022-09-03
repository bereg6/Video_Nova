import React, {useEffect} from "react"
import "../style.css"
import Field from "../../../primitives/field/field"
import Button from "../../../primitives/button/button"
import {
    funcRePass, funcSignUpName,
    funcSignUpPass,
    reg,
    showAlert,
    showSignIn,
} from "../../../redux/actions"
import {connect, useDispatch} from "react-redux"
import Alert from "../../../primitives/field/alert"
import {useHideForm} from "../../../hooks/customHooks"

function SignUp({alert, reg, showAlert, signUpName, signUpPass, rePass, showSignIn, loading}) {
    const dispatch = useDispatch()
    useHideForm("signUp")

    useEffect(() => {
        const thisName = document.getElementById("name")
        thisName.value = signUpName
        const thisPassword = document.getElementById("password")
        thisPassword.value = signUpPass
        const thisRePassword = document.getElementById("rePassword")
        thisRePassword.value = rePass
        thisName.oninput = () => dispatch(funcSignUpName(thisName.value))
        thisPassword.oninput = () => dispatch(funcSignUpPass(thisPassword.value))
        thisRePassword.oninput = () => dispatch(funcRePass(thisRePassword.value))
    }, [signUpName, signUpPass, rePass])

    function funcSignUp() {
        if (signUpName === "" || signUpPass ==="" || rePass === "") {
            showAlert("Fields can't be empty.")
        } else if (signUpPass !== rePass) {
            showAlert("Password values do not match.")
        } else if (signUpName !== "" && signUpPass !== "") {
            let data = {
                username: signUpName,
                password: signUpPass
            }
            reg(data)
        }
    }

    return(
        <div className="form" id="signUp">
            <div className="form__heading">
                <h1 style={{paddingRight: "10px"}}>Sign</h1>
                <h1 style={{color: "#FF6363"}}>Up</h1>
            </div>
            {alert && <Alert text={alert}/>}
            <Field id={"name"} label={"Name"}/>
            <Field id={"password"} label={"Password"}/>
            <Field id={"rePassword"} label={"Repeat Password"}/>
            <div className="form__button">
                {loading ? <Button text={"Sign Up"} loading/>
                : <Button text={"Sign Up"} onClick={funcSignUp}/>}
            </div>
            <div className="form__footer">
                <span>Already have an account?</span>
                <span style={{color: "#5B4DFF", paddingLeft: "10px", cursor: "pointer"}} onClick={showSignIn}>
                    Sign In
                </span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        alert: state.app.alert,
        signUpName: state.forms.signUpName,
        signUpPass: state.forms.signUpPass,
        rePass: state.forms.rePass,
        loading: state.app.loading,
    }
}
const mapDispatchToProps = {
    reg, showAlert, showSignIn, funcSignUpPass, funcSignUpName, funcRePass,
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)