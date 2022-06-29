import React, {useContext} from "react";
import {Link} from "react-router-dom";

import "../styles/Header.css";
import AuthContext from "../context/AuthContext";

const Header = () => {

    let {user, logoutUser} = useContext(AuthContext)

    return (
        <div className={'navbar'}>
            <nav className={"logoutButton"}>
                {user ? (
                    <ul>
                        <Link className={'link'} to={"/"}>
                            Home
                        </Link>

                        <Link className={'link'} to={'/shiftinfo'}>
                            ShiftInfo
                        </Link>

                        <li className={'link'}>
                            <a onClick={logoutUser}>
                                Logout
                            </a>
                        </li>

                    </ul>
                ): (
                    <ul>
                        <li>

                        </li>
                    </ul>
                )
                }

            </nav>
        </div>
    )
}

export default Header;