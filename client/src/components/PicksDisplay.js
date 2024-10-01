import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';

export default function PicksDisplay() {
    const [picks, setPicks] = useState([])

    useEffect(() => {
        async function fetchPicks() {
            try {
                const response = await axios(`api/picksdisplay`)
                const sortedList = response.data.sort((a, b) => (a.series_id > b.series_id) ? 1 : (a.series_id === b.series_id) ? ((a.name > b.name) ? 1 : -1) : -1)
                setPicks(sortedList)
            } catch (e) {
                console.log(e)
            }
        }
        fetchPicks()
    }, [])

    return (

        <div className="table">
            <h3>Picks:</h3>
            <div className="table picksTable">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th key='series id'>Name</th>
                            <th key='series id'>Series #</th>
                            <th key='series pick'>Pick</th>
                        </tr>
                    </thead>
                    <tbody>
                        {picks.length > 0 ? picks.map(thisPick =>
                            <tr>
                                <td key={thisPick.name}>{thisPick.name}</td>
                                <td key={thisPick.series_round}>{thisPick.series_round}</td>
                                <td key={thisPick.pick}>{thisPick.pick}</td>
                            </tr>
                        ) : ""
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}



