import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './pages/Login';
import Search from './pages/Search';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex justify-center align-middle">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;