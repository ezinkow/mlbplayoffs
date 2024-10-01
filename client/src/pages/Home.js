import React from 'react'
import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'


export default function Home() {


    return (
        <div>
            <Navbar />
            <div className='container'>
                <br></br>
                <Link to="/picks"><h3>Current Round Picks</h3></Link>
                <br></br>
                <br></br>
                
                <a href='https://www.mlb.com/scores' target="_blank"><h5>Scores</h5></a>
                <a href='https://www.mlb.com/postseason' target="_blank"><h5>Playoff Picture</h5></a>
            </div>
        </div>
    )
}