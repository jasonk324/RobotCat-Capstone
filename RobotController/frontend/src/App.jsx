import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Header from './components/Header';

const App = () => {
  return (
    <div className="main font-NotoSans">
    	<Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video" element={<Video />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;