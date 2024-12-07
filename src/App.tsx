
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./components/Home";
import Form from "./components/Form";
import TurnierDetail from "./components/TurnierDetail";
import Turniere from "./components/Turniere";
import TournamentOverview from "./components/TournamentOverview";
import TurnierKalender from "./components/Turnierkalender";
import KalenderTurnierSeite from "./components/KalenderTurnierSeite";
import Layout from "./components/Layout";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<TurnierKalender />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/tournaments" element={<Turniere />} />
                    <Route path="/tournament/:id" element={<TurnierDetail />} />
                    <Route path="/overview" element={<TournamentOverview />} />
                    <Route path="/calendar" element={<TurnierKalender />} />
                    <Route path="/calendartournament" element={<KalenderTurnierSeite />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
