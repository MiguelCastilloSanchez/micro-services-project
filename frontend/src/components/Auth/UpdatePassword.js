import React, { useState } from 'react';
import { updatePassword } from '../../api/auth';

const UpdatePassword = ({ token }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(oldPassword, newPassword, token);
      // manejar éxito
    } catch (err) {
      setError('Error updating password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Old Password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Update Password</button>
    </form>
  );
};

export default UpdatePassword;

