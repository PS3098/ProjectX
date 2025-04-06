import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Results from './pages/Results';
import History from './pages/History';
import Login from './pages/Login';
import Signup from './pages/Signup';

const AnimatedRoutes = ({ isAuthenticated, onLogin }: any) => {
  const location = useLocation();
  const hideLayout = location.pathname === '/';

  return (
    <>
      {!hideLayout && <Header />}
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/home" replace /> : <Login onLogin={onLogin} />
              }
            />
            <Route
              path="/home"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/upload"
              element={
                isAuthenticated ? <Upload /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/results"
              element={
                isAuthenticated ? <Results /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/history"
              element={
                isAuthenticated ? <History /> : <Navigate to="/" replace />
              }
            />
<Route path="/signup" element={<Signup />} />

            <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!hideLayout && <Footer />}
    </>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter basename="/app">
      <div className="min-h-screen mesh-gradient flex flex-col">
        <AnimatedRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
      </div>
    </BrowserRouter>
  );
}

export default App;

