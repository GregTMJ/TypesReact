import React from 'react';
import {Link} from 'react-router-dom';

import '../styles/HomePage.css';


const HomePage = () => {

    return (
        <div className='Main-Content'>
            <section className="main">
                <div className="wrap wrap--1">
                    <div className="container container--1">
                        <Link to={'/vi'} className='links'> Высокий </Link>
                    </div>
                </div>

                {/*<div className="wrap wrap--2">*/}
                {/*    <div className="container container--2">*/}
                {/*        <Link to='/np' className='links'>НП</Link>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="wrap wrap--3">*/}
                {/*    <div className="container container--2">*/}
                {/*        <Link to='/nts320' className='links'>НТС-320</Link>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </section>
        </div>
    )
}

export default HomePage;