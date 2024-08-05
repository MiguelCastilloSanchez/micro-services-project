import React, { useState } from 'react';
import UpdatePassword from '../components/Auth/UpdatePassword';

const UpdatePasswordPage = () => {
  const [token] = useState(localStorage.getItem('token')); 

  return (
    <div>
      <UpdatePassword token={token} />
    </div>
  );
};

export default UpdatePasswordPage;

