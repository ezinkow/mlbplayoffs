import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';

export default function PicksDisplay() {
    const [picks, setPicks] = useState([])
    const [series, setSeries] = useState([])

    useEffect(() => {
        async function fetchPicks() {
            try {
                const response = await axios(`api/picksdisplay`)
                const newArr = response.data
                for (let i = 0; i < newArr.length; i++) {
                    const thisPickSet = newArr[i];
                    const newPickArr = thisPickSet.pick.split(',')
                    newArr[i].pick = newPickArr
                }
                setPicks(newArr)
            } catch (e) {
                console.log(e)
            }
        }
        fetchPicks()
    }, [])

    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await axios(`api/series`)
                // console.log('response', response)
                setSeries(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchGames()
    }, []);

    return (

        <div className="table">
            <h3>Picks:</h3>
            <div className="table-scroll">
                <table className="table-main picksTable">
                    <thead>
                        <tr>
                            <th className="fix-col" key='series id'>Name</th>
                            {series.length > 0 ? series.map(series =>
                                <th key={series.id}>{series.lower_seed} vs {series.higher_seed}|P|G</th>
                            ) : ""
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {picks.length > 0 ? picks.map(thisPickSet =>
                            <tr>
                                <th className="fix-col">{thisPickSet.name} ({thisPickSet.points})</th>
                                <td key={thisPickSet.pick[0]}>{thisPickSet.pick[0]}</td>
                                <td key={thisPickSet.pick[1]}>{thisPickSet.pick[1]}</td>
                                <td key={thisPickSet.pick[2]}>{thisPickSet.pick[2]}</td>
                                <td key={thisPickSet.pick[3]}>{thisPickSet.pick[3]}</td>
                                <td key={thisPickSet.pick[4]}>{thisPickSet.pick[4]}</td>
                                <td key={thisPickSet.pick[5]}>{thisPickSet.pick[5]}</td>
                                <td key={thisPickSet.pick[6]}>{thisPickSet.pick[6]}</td>
                                <td key={thisPickSet.pick[7]}>{thisPickSet.pick[7]}</td>
                                <td key={thisPickSet.pick[8]}>{thisPickSet.pick[8]}</td>
                                <td key={thisPickSet.pick[9]}>{thisPickSet.pick[9]}</td>
                                <td key={thisPickSet.pick[10]}>{thisPickSet.pick[10]}</td>
                                <td key={thisPickSet.pick[11]}>{thisPickSet.pick[11]}</td>
                                <td key={thisPickSet.pick[12]}>{thisPickSet.pick[12]}</td>
                                <td key={thisPickSet.pick[13]}>{thisPickSet.pick[13]}</td>
                                <td key={thisPickSet.pick[14]}>{thisPickSet.pick[14]}</td>
                                <td key={thisPickSet.pick[15]}>{thisPickSet.pick[15]}</td>
                            </tr>
                        ) : ""
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}



