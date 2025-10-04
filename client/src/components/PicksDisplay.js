import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

// --- Helpers ---
const parsePickString = (pickStr) =>
  pickStr ? pickStr.split(",") : [];

const formatPick = (pickStr) => {
  if (!pickStr) return "";
  const [team, points, games] = pickStr.split("|");
  return `${team} | ${points} | ${games}`;
};

const buildPickMap = (user) => {
  const pickItems = parsePickString(user.pick);
  const userSeriesIds = user.series_id
    ? user.series_id.split(",").map((sid) => sid.trim())
    : [];

  return userSeriesIds.reduce((map, sid, i) => {
    map[String(sid)] = pickItems[i];
    return map;
  }, {});
};

// --- Component ---
export default function PicksDisplay() {
  const [picks, setPicks] = useState([]);
  const [series, setSeries] = useState([]);

  // Fetch picks
  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const res = await axios.get("/api/picksdisplay");
        const sorted = res.data.sort((a, b) => b.points - a.points);
        setPicks(sorted);
        console.log("Fetched picks:", sorted);
      } catch (err) {
        console.error("Error fetching picks:", err);
      }
    };
    fetchPicks();
  }, []);

  // Fetch series
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await axios.get("/api/series/y");
        const sorted = [...res.data].sort((a, b) => Number(a.id) - Number(b.id));
        setSeries(sorted);
        console.log("Fetched series:", sorted.map((s) => s.id));
      } catch (err) {
        console.error("Error fetching series:", err);
      }
    };
    fetchSeries();
  }, []);

  return (
    <div className="picksTable">
      <h4>Picks Display (Format: Team | Points | Games)</h4>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            {series.map((s) => (
              <th key={`header-${s.id}`}>
                ({s.id}) ({s.lower_seed_seed}) {s.lower_seed} vs (
                {s.higher_seed_seed}) {s.higher_seed}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {picks.map((user) => {
            const pickMap = buildPickMap(user);
            return (
              <tr key={user.id}>
                <td>{user.name} ({user.points})</td>
                {series.map((s) => (
                  <td key={`${user.id}-${s.id}`}>
                    {formatPick(pickMap[String(s.id)])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
