import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default function PicksDisplay() {
    const [picks, setPicks] = useState([]);
    const [series, setSeries] = useState([]);

    // Fetch picks
    useEffect(() => {
        async function fetchPicks() {
            try {
                const response = await axios.get("api/picksdisplay");
                const data = response.data.sort((a, b) => b.points - a.points); // sort by points descending
                setPicks(data);
                console.log("Fetched picks data:", data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchPicks();
    }, []);
    console.log("Fetched picks:", picks);

    // Fetch series info
    useEffect(() => {
        async function fetchSeries() {
            try {
                const response = await axios.get("api/series/y");
                setSeries(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchSeries();
    }, []);

    // Helper: parse pick string into array
    const parsePickString = (pickStr) => (pickStr ? pickStr.split(",") : []);

    const formatPick = (pickStr) => {
        if (!pickStr) return "";
        const [team, points, games] = pickStr.split("|");
        return `${team} | ${points} | ${games}`;
      };

    // Helper: build a map of series_id -> header text
    const seriesHeaderMap = series.reduce((acc, s) => {
        acc[String(s.id)] = `(${s.id}) (${s.lower_seed_seed}) ${s.lower_seed} vs (${s.higher_seed_seed}) ${s.higher_seed}`;
        return acc;
    }, {});

    // Sorted series IDs for consistent column order
    const sortedSeries = [...series].sort((a, b) => a.id - b.id);

    return (
        <div className="table">
            <h4>Picks Display (Format: Pick | Points | Games)</h4>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        {sortedSeries.map((s) => (
                            <th key={s.id}>
                                ({s.id}) ({s.lower_seed_seed}) {s.lower_seed} vs ({s.higher_seed_seed}) {s.higher_seed}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {picks.map((user) => {
                        const pickItems = parsePickString(user.pick);
                        const userSeriesIds = user.series_id ? user.series_id.split(",") : [];

                        // Build map of series_id -> pick string
                        const pickMap = {};
                        userSeriesIds.forEach((sid, i) => {
                            pickMap[String(sid)] = pickItems[i];
                        });

                        return (
                            <tr key={user.id}>
                                <td>{user.name} ({user.points})</td>
                                {sortedSeries.map((s) => (
                                    <td key={s.id}>{formatPick(pickMap[String(s.id)])}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
