// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PickerPage from './pages/PickerPage';
import RecordPage from './pages/RecordPage';

function App() {
  return (
    <Router>
      <div>
      <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/record">Enter a Record</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/record" element={<RecordPage />} />
          <Route path="/" element={<PickerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
