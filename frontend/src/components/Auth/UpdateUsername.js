import React, { useState } from 'react';
import { updateUsername } from '../../api/auth';

const UpdateUsername = ({ token }) => {
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsername(newUsername, token);
      // manejar éxito
    } catch (err) {
      setError('Error updating username');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>New Username:</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Update Username</button>
    </form>
  );
};

export default UpdateUsername;

