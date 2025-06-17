import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Demo from './parts/backgroundeffect';         // Login page
import CardHoverEffectDemo from './parts/order-page'; // Orders page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Demo />} />
        <Route path="/orders" element={<CardHoverEffectDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
