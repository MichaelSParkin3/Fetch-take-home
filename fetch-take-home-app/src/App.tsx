import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex justify-center align-middle">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;