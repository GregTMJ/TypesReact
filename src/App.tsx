import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import NoContent from "./components/NoContent";
import ShiftInfo from "./components/ShiftInfo";
import PrivateRoute from "./utils/PrivateRoute";
import Units from "./components/Units";



import axios from "axios";

// These axios defaults allows us to get the csrftoken of any django requests
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = "csrftoken";



function App() {
    return (

        <div className={"content-wrapper"}>
            <Routes>
                <Route path={'/'} element={<PrivateRoute>
                    <HomePage/>
                </PrivateRoute>}/>
                <Route path={':id'} element={<PrivateRoute>
                    <Units/>
                </PrivateRoute>}/>
                <Route path={':id/shiftInfo'} element={<PrivateRoute>
                    <ShiftInfo/>
                </PrivateRoute>}/>

                <Route path={"/login"} element={<Login/>}/>
                <Route path={"*"} element={<NoContent/>}/>
            </Routes>
        </div>

    );
}

export default App;
