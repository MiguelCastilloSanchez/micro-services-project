import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<><LoginPage /><Footer /></>} />
        <Route path="/register" element={<><RegisterPage /><Footer /></>} />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="*" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
