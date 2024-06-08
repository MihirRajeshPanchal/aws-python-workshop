import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Drive from './components/Drive';
import Email from './components/Email';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drive" element={<Drive />} />
          <Route path="/email" element={<Email />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
} 

export default App;
