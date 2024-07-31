import React, { useState } from 'react';
import Login from '../components/Auth/Login';

const LoginPage = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
    // guardar token en almacenamiento local o redirigir a otra página
  };

  return (
    <div>
      <h1>Login</h1>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;

