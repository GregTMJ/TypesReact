import React, {useContext, useEffect} from "react";


import "../styles/Login.css";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () => {

    let {user, loginUser} = useContext(AuthContext)
    let navigate = useNavigate()

    useEffect(() => {
        if (user) {
            return navigate("/")
        }
    }, [user])

    return (
        <div className={"loginForm"}>
            <form onSubmit={loginUser} className={"flex-row"}>
                <label htmlFor={"Username"} className={'loginlabel'}>Username: </label>
                <input className={"Username"} type={'text'} name={'username'}
                       placeholder={"Enter your username... "}/>

                <label htmlFor={"Password"} className={'loginlabel'}>Password: </label>
                <input className={"Password"} type={'password'} name={'password'}
                       placeholder={'Enter your password...'} autoComplete="off"/>
                <button type={"submit"} className={"form-submit"}>submit</button>

            </form>
        </div>
)
}

export default Login;