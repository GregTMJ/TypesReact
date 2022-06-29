import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';

import Units from "./components/Units";
import Login from "./components/Login";
import ShiftInfo from "./components/ShiftInfo";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
    return (

        <div className={"content-wrapper"}>
            <Routes>
                <Route path={"/"} element={<PrivateRoute>
                    <Units/>
                </PrivateRoute>
                }/>
                <Route path={'/shiftInfo'} element={<PrivateRoute>
                    <ShiftInfo/>
                </PrivateRoute>}/>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>
        </div>

    );
}

export default App;
