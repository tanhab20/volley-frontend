import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import TurnierDetail from "./components/TurnierDetail";
import Turniere from "./components/Turniere";
import TournamentOverview from "./components/TournamentOverview";
import TurnierKalender from "./components/Turnierkalender";

function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Home />
                <Routes>
                    <Route path="/form" element={<Form />} />
                    <Route path="/tournaments" element={<Turniere />} />
                    <Route path="/tournament/:id" element={<TurnierDetail />} />
                    <Route path="/overview" element={<TournamentOverview />} />
                    <Route path="/calendar" element={<TurnierKalender />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
