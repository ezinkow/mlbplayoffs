import React from 'react'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import Steps from './Steps'

export default function PicksRound() {
    const [name, setName] = useState('SELECT YOUR NAME IN DROPDOWN!')
    const [names, setNames] = useState([''])
    const [seriess, setSeries] = useState([])
    const [seriesValue, setSeriesValue] = useState('')
    const [picks, setPicks] = useState([])
    const [nameToast, setNameToast] = useState('')
    const [currentPick, setCurrentPick] = useState([])
    const [modalIsOpen, setIsOpen] = useState('')
    const [pointsTotal, setPointsTotal] = useState('')
    const [gamesTotal, setGamesTotal] = useState('')


    useEffect(() => {
        async function fetchSeries() {
            try {
                const response = await axios('api/series/y')
                setSeries(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchSeries()
    }, [])

    useEffect(() => {
        async function fetchNames() {
            try {
                const response = await axios('api/names')
                const sortedList = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name));
                setNames(sortedList)
            } catch (e) {
                console.log(e)
            }
        }
        fetchNames()
    }, [])

    useEffect(() => {
        async function fetchSeriesValue() {
            try {
                const response = await axios('api/roundvalues/y')
                setSeriesValue(response.data[0].points)
            } catch (e) {
                console.log(e)
            }
        }
        fetchSeriesValue()
    }, [])

    // Set Name
    const handleNameSelect = event => {
        setName(event);
        setNameToast(event);
    };

    const namesList =
        names.map(name =>
            <Dropdown.Item
                eventKey={name.name}
                key={name.name}
            >
                {name.name}
            </Dropdown.Item>
        )

    // Set Picks
    const handleTeamChange = (event, id, lower_seed_seed, lower_seed, higher_seed_seed, higher_seed, series_round) => {
        let activePicks = picks
        const currentPick = event.target.value
        const currentPickObj = {
            series_id: id,
            pick: currentPick,
            lower_seed_seed,
            lower_seed,
            higher_seed_seed,
            higher_seed,
            series_round
        }
        setCurrentPick(currentPick)
        if (activePicks.length > 0) {
            let findCurrentPick = activePicks.find(o => o.series_id === id)
            if (findCurrentPick === undefined) {
                activePicks.push(currentPickObj)
                setPicks(activePicks)
            } else {
                findCurrentPick.pick = currentPick
                setPicks(activePicks)
            }
        } else {
            activePicks.push(currentPickObj)
            setPicks(activePicks);
        }
        console.log(picks)
    }

    function pointsCounter() {
        if (picks.length > 0) {
            const pointValues = picks.map(point =>
                parseInt(point.points))
            let sum = pointValues.reduce(function (a, b) {
                return a + b;
            });
            setPointsTotal(sum)
        }
    }

    const handleGamesChange = (event, id) => {
        //get picks
        let activePicks = picks
        //get point value
        const currentGames = event.target.value
        //check if series.id is there
        const currentPickObj = {
            series_id: id,
            games: currentGames
        }
        if (activePicks.length > 0) {
            let findCurrentPick = activePicks.find(o => o.series_id === id)
            if (findCurrentPick === undefined) {
                activePicks.push(currentPickObj)
                setPicks(activePicks)
            } else {
                findCurrentPick.games = currentGames
                setPicks(activePicks)
            }
        } else {
            toast.error('Please select team first, then RESELECT point value',
                {
                    duration: 5000,
                    position: 'top-center',
                    style: {
                        border: '2px solid #713200',
                        padding: '20px',
                        marginTop: '100px',
                        backgroundColor: 'rgb(255,0,0)',
                        color: 'rgb(255,255,255)'
                    },
                });
        }
        setGamesTotal(currentGames)
        console.log(picks)
    }

    const handlePointsChange = (event, id) => {
        //get picks
        let activePicks = picks
        //get point value
        const currentPoints = event.target.value
        //check if series.id is there
        const currentPickObj = {
            series_id: id,
            points: currentPoints
        }
        if (activePicks.length > 0) {
            let findCurrentPick = activePicks.find(o => o.series_id === id)
            if (findCurrentPick === undefined) {
                activePicks.push(currentPickObj)
                setPicks(activePicks)
                console.log(activePicks)
            } else {
                findCurrentPick.points = currentPoints
                setPicks(activePicks)
                console.log(activePicks)
            }
        } else {
            toast.error('Please select team first, then RESELECT point value',
                {
                    duration: 5000,
                    position: 'top-center',
                    style: {
                        border: '2px solid #713200',
                        padding: '20px',
                        marginTop: '100px',
                        backgroundColor: 'rgb(255,0,0)',
                        color: 'rgb(255,255,255)'
                    },
                });
        }
        pointsCounter()
        console.log(picks)
    }

    // Send name and picks to database and reset fields
    function handleSubmitClick(event) {

        if (name != 'SELECT YOUR NAME IN DROPDOWN!') {
            event.preventDefault()
            setIsOpen(true);
            for (let i = 0; i < picks.length; i++) {
                const series_id = picks[i].series_id;
                const pick = picks[i].pick
                const series_round = picks[i].series_round
                const points = picks[i].points
                const games = picks[i].games
                axios.post('api/picks', {
                    name,
                    series_id,
                    pick,
                    series_round,
                    points,
                    games
                })
            }
            toast.success(`Thanks, ${nameToast}, picks submitted.`,
                {
                    duration: 10001,
                    position: 'top-center',
                    style: {
                        border: '2px solid #713200',
                        padding: '20px',
                        marginTop: '100px',
                        color: 'white',
                        backgroundColor: 'rgb(60, 179, 113, 0.7)'
                    },
                    icon: '🏀',
                    role: 'status',
                    ariaLive: 'polite',
                });
            setName("")
            setPicks("")
        } else {
            toast.error('Please select name in dropdown!',
                {
                    duration: 5000,
                    position: 'top-center',
                    style: {
                        border: '2px solid #713200',
                        padding: '20px',
                        marginTop: '100px',
                        backgroundColor: 'rgb(255,0,0)',
                        color: 'rgb(255,255,255)'
                    },
                });
        }

    }

    return (
        <div className='container'>
            <Toaster />
            <Steps />
            <DropdownButton
                id="dropdown-basic-button"
                title='Name'
                onSelect={handleNameSelect}
                key='dropdown'>{namesList}
            </DropdownButton>
            <h4> Name: {name}</h4>
            <h5>Most Recent Pick: {currentPick}</h5>
            <h5>TOTAL POINTS: {pointsTotal} (must equal {seriesValue})</h5>
            <div className="table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Series #</th>
                            <th>Seed</th>
                            <th>Lower Seed</th>
                            <th>Seed</th>
                            <th>Higher Seed</th>
                            <th>Pick</th>
                            <th>Points</th>
                            <th># of Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seriess.map(series =>
                            <tr>
                                <>
                                    <td key={series.id}>{series.id}</td>
                                    <td key={series.lower_seed_seed}>{series.lower_seed_seed}</td>
                                    <td key={series.lower_seed}>{series.lower_seed}</td>
                                    <td key={series.higher_seed_seed}>{series.higher_seed_seed}</td>
                                    <td key={series.higher_seed}>{series.higher_seed}</td>
                                    <td>
                                        <select
                                            key={series.id}
                                            value={currentPick}
                                            onChange={() => { handleTeamChange(event, series.id, series.lower_seed_seed, series.lower_seed, series.higher_seed_seed, series.higher_seed, series.series_round) }}
                                        >
                                            <option
                                                key='pick'
                                                value=''
                                            >

                                            </option>
                                            <option
                                                key={series.lower_seed}
                                                value={series.lower_seed}
                                            >
                                                ({series.lower_seed_seed}){series.lower_seed}
                                            </option>
                                            <option
                                                key={series.higher_seed}
                                                value={series.higher_seed}
                                            >
                                                ({series.higher_seed_seed}){series.higher_seed}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            onChange={() => { handlePointsChange(event, series.id) }}>
                                            <option
                                                key=''
                                                value=''></option>
                                            <option
                                                key='p1'
                                                value='1'>1</option>
                                            <option
                                                key='p2'
                                                value='2'>2</option>
                                            <option
                                                key='p3'
                                                value='3'>3</option>
                                            <option
                                                key='p4'
                                                value='4'>4</option>
                                            <option
                                                key='p5'
                                                value='5'>5</option>
                                            <option
                                                key='p6'
                                                value='6'>6</option>
                                            <option
                                                key='p7'
                                                value='7'>7</option>
                                            <option
                                                key='p8'
                                                value='8'>8</option>
                                            <option
                                                key='p9'
                                                value='9'>9</option>
                                            <option
                                                key='p10'
                                                value='10'>10</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            onChange={() => { handleGamesChange(event, series.id) }}>
                                            <option
                                                key=''
                                                value=''></option>
                                            <option
                                                key='g4'
                                                value='4'>4</option>
                                            <option
                                                key='g5'
                                                value='5'>5</option>
                                            <option
                                                key='g6'
                                                value='6'>6</option>
                                            <option
                                                key='g7'
                                                value='7'>7</option>
                                        </select>
                                    </td>
                                </>
                            </tr>
                        )
                        }
                    </tbody>
                </Table>

                <Button onClick={handleSubmitClick}>Submit</Button>
            </div>
            <>
                <h3>Picks (selected {picks.length} out of {seriess.length}):</h3>
                <h5>Note: "games" might not show up here but it's getting logged. If you're nervous about your picks, press f12 and you'll see your picks in the dev tools</h5>
                <div className="table picksTable">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th key='series id'>#</th>
                                <th key='series'>Series</th>
                                <th key='series pick'>Pick</th>
                                <th key='series points'>Points</th>
                                <th key='series games'>Games</th>
                            </tr>
                        </thead>
                        <tbody>
                            {picks.length > 0 ? picks.map(thisPick =>
                                <tr>
                                    <td key={thisPick.series_id}>{thisPick.series_id}</td>
                                    <td key='matchup'>({thisPick.lower_seed_seed}){thisPick.lower_seed} vs ({thisPick.higher_seed_seed}){thisPick.higher_seed}</td>
                                    <td key={thisPick.pick}>{thisPick.pick}</td>
                                    <td key={thisPick.points}>{thisPick.points}</td>
                                    <td key={thisPick.games}>{thisPick.games}</td>
                                </tr>
                            ) : ""
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        </div>
    )
}

