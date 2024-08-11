import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import DadosPersonagem from './components/DadosPersonagem/DadosPersonagem';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/personagem/:id" element={<DadosPersonagem />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
