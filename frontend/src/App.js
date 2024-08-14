import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute'

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<><LoginPage /><Footer /></>} />
        <Route path="/register" element={<><RegisterPage /><Footer /></>} />
        <Route path="/*" element={<><NotFound /><Footer /></>} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <>
                <Header />
                <QueryClientProvider client={queryClient}>
                <Home />
                </QueryClientProvider>
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        
      </Routes>
    </div>
  );
};

export default App;