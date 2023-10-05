import React from 'react'
import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'


export default function Home() {


    return (
        <div>
            <Navbar />
            <div className='container'>
                <br></br>
                <br></br>
                <a href='https://docs.google.com/spreadsheets/d/1E3sHKvva-77XwQ8t9RV_aVt_B-ex0SomWSvSF5LsSmE/' target="_blank"><h3>Check out the google doc for your picks results</h3></a>
                <br></br>
                <br></br>
                <Link to="/picks"><h3>Current Round Picks</h3></Link>
                <br></br>
                <br></br>
                
                <a href='https://www.mlb.com/scores' target="_blank"><h5>Scores</h5></a>
                <a href='https://www.mlb.com/news/2023-mlb-playoff-and-world-series-schedule' target="_blank"><h5>Playoff Picture</h5></a>
            </div>
        </div>
    )
}