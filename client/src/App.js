import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './components/Chat';
import Join from './components/Join';
import './App.css';
import 'boxicons/css/boxicons.min.css';
import SharedLink from './components/share/SharedLink';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<SharedLink />} />
      </Routes>
    </Router>
  );
}

export default App;
