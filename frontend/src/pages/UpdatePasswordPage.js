import React, { useState } from 'react';
import UpdatePassword from '../components/Auth/UpdatePassword';

const UpdatePasswordPage = () => {
  const [token] = useState(localStorage.getItem('token')); 

  return (
    <div>
      <h1>Update Password</h1>
      <UpdatePassword token={token} />
    </div>
  );
};

export default UpdatePasswordPage;

