import React from 'react'
import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Picks from './pages/Picks';
import PicksDisplay from './pages/PicksDisplay';
import Standings from './pages/Standings';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/picks" element={<Picks />} />
        <Route path="/picksdisplay" element={<PicksDisplay />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}
