import { useState } from 'react';
import './App.css';
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center align-middle">
        <Login></Login>
      </div>
    </>
  );
}

export default App;
