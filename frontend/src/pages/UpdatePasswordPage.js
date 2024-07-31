import React, { useState } from 'react';
import UpdatePassword from '../components/Auth/UpdatePassword';

const UpdatePasswordPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Asegúrate de que el token esté almacenado

  return (
    <div>
      <h1>Update Password</h1>
      <UpdatePassword token={token} />
    </div>
  );
};

export default UpdatePasswordPage;

