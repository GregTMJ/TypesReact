import React from "react";
import {useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import axiosInstance from "../utils/axiosAPI";

interface Auth {
    user?: object,
    authTokens?: string | object,
    loginUser?: (e: any) => Promise<void>
    logoutUser?: () => void,
}

const AuthContext = React.createContext<Auth>({})

export default AuthContext;

export const AuthProvider = ({children}: any) => {

    let localStoragePage: any = localStorage.getItem('authTokens')

    let [authTokens, setAuthTokens] = useState<any>(() => localStorage.getItem('authTokens') ? JSON.parse(localStoragePage) : null)
    let [user, setUser] = useState<any>(() => localStorage.getItem('authTokens') ? jwt_decode(localStoragePage) : null)
    let [loading, setLoading] = useState<boolean>(true)

    const navigate = useNavigate()


    let loginUser = async (e: any) => {

        e.preventDefault()

        let response = await fetch('http://192.100.1.50:7000/api/token/obtain/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            localStorage.setItem('access_token', (`JWT ${data.access}`))
            console.log(localStorage.getItem('access_token'))
            localStorage.setItem('refresh_token', JSON.stringify(data.refresh))
            navigate('/')
        } else {
            alert('Вводные данные неверны! Попробуйте ещё раз!')
        }
    }

    let logoutUser = (): void => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('access_token')
        navigate('/login/')
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {

        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false);


    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}