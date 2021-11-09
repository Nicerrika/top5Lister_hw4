import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'
import ErrorScreen from '../components/ErrorScreen.js'
const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    ERROR_MODAL: "ERROR_MODAL"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error:false,
        error_message: ""
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error:false,
                    error_message: ""
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error:false,
                    error_message: ""
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error:false,
                    error_message: ""
                })
            }
            case AuthActionType.LOGOUT_USER:{
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error:false,
                    error_message: ""
                })
            }
            case AuthActionType.ERROR_MODAL:{
                return setAuth({
                    user:null,
                    loggedIn:false,
                    error:payload.error,
                    error_message: payload.msg
                })
            }

            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        //const response = await api.getLoggedIn();
        try{
            const response = await api.getLoggedIn();
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
        catch(err){
            console.log("What happen");
        }
        
    }

    auth.registerUser = async function(userData, store) {
        try {
            const response = await api.registerUser(userData);
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
            store.loadIdNamePairs();
        }
        catch(err){
            console.log(err.response.data.errorMessage);
            authReducer({
                type: AuthActionType.ERROR_MODAL,
                payload: {
                    error: true,
                    msg: err.response.data.errorMessage
                }
            });

        }
    }

    auth.loginUser = async function(userData, store) {
        //const response = await api.loginUser(userData);
        //console.log(response.data.user);     
        try {
            const response = await api.loginUser(userData);
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
            store.loadIdNamePairs();
        }
        catch(err){
            authReducer({
                type: AuthActionType.ERROR_MODAL,
                payload: {
                    error: true,
                    msg: err.response.data.errorMessage
                }
            });

        }
    }

    auth.logoutUser =async function(){
        //const response = await api.logoutUser();
        try{
            const response = await api.logoutUser();
            authReducer({
                type: AuthActionType.LOGOUT_USER,
            })
            history.push("/");
        }
        catch(err){
            authReducer({
                type: AuthActionType.ERROR_MODAL,
                payload: {
                    error: true,
                    msg: err.response.data.errorMessage
                }
            });

        }
    }

    auth.handleClose =async function(){
        authReducer({
            type: AuthActionType.ERROR_MODAL,
            payload: {
                error: false,
                msg: ""
            }
        });
    }
    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };