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
    // State
    const [name, setName] = useState("SELECT YOUR NAME IN DROPDOWN!");
    const [names, setNames] = useState([]);
    const [seriess, setSeries] = useState([]);
    const [seriesValue, setSeriesValue] = useState("");
    const [picks, setPicks] = useState([]);
    const [nameToast, setNameToast] = useState("");
    const [currentPick, setCurrentPick] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [pointsTotal, setPointsTotal] = useState(0);
    const [gamesTotal, setGamesTotal] = useState("");

    // Fetch series
    useEffect(() => {
        async function fetchSeries() {
            try {
                const response = await axios("api/series/y");
                setSeries(response.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchSeries();
    }, []);

    // Fetch names
    useEffect(() => {
        async function fetchNames() {
            try {
                const response = await axios("api/names");
                const sortedList = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setNames(sortedList);
            } catch (e) {
                console.log(e);
            }
        }
        fetchNames();
    }, []);

    // Fetch series value
    useEffect(() => {
        async function fetchSeriesValue() {
            try {
                const response = await axios("api/roundvalues/y");
                setSeriesValue(response.data[0].points);
            } catch (e) {
                console.log(e);
            }
        }
        fetchSeriesValue();
    }, []);

    // Set Name
    const handleNameSelect = (event) => {
        setName(event);
        setNameToast(event);
    };

    const namesList = names.map((n) => (
        <Dropdown.Item eventKey={n.name} key={n.name}>
            {n.name}
        </Dropdown.Item>
    ));

    // ---------- Helpers ----------

    // safely update or insert a pick
    const upsertPick = (series_id, updates) => {
        setPicks((prev) => {
            const existing = prev.find((p) => p.series_id === series_id);
            if (existing) {
                return prev.map((p) =>
                    p.series_id === series_id ? { ...p, ...updates } : p
                );
            } else {
                return [...prev, { series_id, ...updates }];
            }
        });
    };

    // Recalculate total points
    const pointsCounter = (picksArr) => {
        if (picksArr.length > 0) {
            const sum = picksArr.reduce(
                (acc, p) => acc + (parseInt(p.points) || 0),
                0
            );
            setPointsTotal(sum);
        } else {
            setPointsTotal(0);
        }
    };

    // ---------- Handlers ----------

    const handleTeamChange = (
        event,
        id,
        lower_seed_seed,
        lower_seed,
        higher_seed_seed,
        higher_seed,
        series_round
    ) => {
        const pick = event.target.value;
        setCurrentPick(pick);
        upsertPick(id, {
            pick,
            lower_seed_seed,
            lower_seed,
            higher_seed_seed,
            higher_seed,
            series_round,
        });
    };

    const handleGamesChange = (event, id) => {
        const currentGames = event.target.value;
        if (!picks.find((p) => p.series_id === id)) {
            return toast.error("Please select team first, then RESELECT point value", {
                duration: 5000,
                position: "top-center",
                style: {
                    border: "2px solid #713200",
                    padding: "20px",
                    marginTop: "100px",
                    backgroundColor: "rgb(255,0,0)",
                    color: "rgb(255,255,255)",
                },
            });
        }
        upsertPick(id, { games: currentGames });
        setGamesTotal(currentGames);
    };

    const handlePointsChange = (event, id) => {
        const currentPoints = event.target.value;
        if (!picks.find((p) => p.series_id === id)) {
            return toast.error("Please select team first, then RESELECT point value", {
                duration: 5000,
                position: "top-center",
                style: {
                    border: "2px solid #713200",
                    padding: "20px",
                    marginTop: "100px",
                    backgroundColor: "rgb(255,0,0)",
                    color: "rgb(255,255,255)",
                },
            });
        }
        upsertPick(id, { points: currentPoints });
        // recalc total points using new picks state
        setPicks((prev) => {
            const updated = prev.map((p) =>
                p.series_id === id ? { ...p, points: currentPoints } : p
            );
            pointsCounter(updated);
            return updated;
        });
    };

    // Send name and picks to database and reset fields
    async function handleSubmitClick(event) {
        event.preventDefault();

        if (name === "SELECT YOUR NAME IN DROPDOWN!") {
            return toast.error("Please select name in dropdown!", {
                duration: 5000,
                position: "top-center",
                style: {
                    border: "2px solid #713200",
                    padding: "20px",
                    marginTop: "100px",
                    backgroundColor: "rgb(255,0,0)",
                    color: "rgb(255,255,255)",
                },
            });
        }

        setIsOpen(true);

        try {
            // loop through picks and update each one
            for (const p of picks) {
                const { series_id, pick, series_round, points, games } = p;
                await axios.put("api/picks", {
                    name,
                    series_id,
                    pick,
                    series_round,
                    points,
                    games,
                });
            }

            toast.success(`Thanks, ${nameToast}, picks submitted.`, {
                duration: 10001,
                position: "top-center",
                style: {
                    border: "2px solid #713200",
                    padding: "20px",
                    marginTop: "100px",
                    color: "white",
                    backgroundColor: "rgb(60, 179, 113, 0.7)",
                },
                icon: "🏀",
                role: "status",
                ariaLive: "polite",
            });

            // reset state
            setName("");
            setPicks([]);
            setPointsTotal(0);
            setGamesTotal("");
        } catch (err) {
            console.error(err);
            toast.error("Error submitting picks.", {
                duration: 5000,
                position: "top-center",
                style: {
                    border: "2px solid #713200",
                    padding: "20px",
                    marginTop: "100px",
                    backgroundColor: "rgb(255,0,0)",
                    color: "white",
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
            <h5>TOTAL POINTS: {pointsTotal} <h4>(must equal {seriesValue})</h4></h5>
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
                                            {/*<option
                                                key='p11'
                                                value='11'>11</option>
                                            <option
                                                key='p12'
                                                value='12'>12</option> */}
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            onChange={() => { handleGamesChange(event, series.id) }}>
                                            <option
                                                key=''
                                                value=''></option>
                                            {/* <option
                                                key='g2'
                                                value='2'>2</option> */}
                                            {/*<option
                                                key='g3'
                                                value='3'>3</option>*/}
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

            </div>
            <Button onClick={handleSubmitClick}>Submit</Button>
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

