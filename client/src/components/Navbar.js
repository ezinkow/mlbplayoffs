import React from 'react'
import banner from '../images/banner.jpg'

import {
    Link
} from "react-router-dom";

export default function Navbar() {

    return (
        <header className="header navbar" style={{ backgroundImage: `url(${banner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <button class="hamburger" onclick="this.classList.toggle('active');document.querySelector('.header nav').classList.toggle('show');">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav>
                <div className='navitext'>
                    <a className="col-1 navtext">
                        <Link to='/'>Home</Link>
                    </a>
                    <a className="col-1 navtext">
                        <Link to='/picks'>Picks</Link>
                    </a>
                    <a className="col-1 navtext">
                        <Link to='/standings'>Standings</Link>
                    </a>
                    <a className="col-1 navtext">
                        <Link to='/picksdisplay'>Group Picks</Link>
                    </a>
                </div>
            </nav>
            <br />
        </header >
        // <header class="header">
        //     <button class="hamburger" onclick="document.querySelector('.header nav').classList.toggle('show')">
        // <span></span>
        // <span></span>
        // <span></span>
        //     </button>
        //     <nav>
        // <a href="#">Home</a>
        // <a href="#">Submit Picks</a>
        // <a href="#">Leaderboard</a>
        // <a href="#">Stats</a>
        //     </nav>
        // </header>
    )
}