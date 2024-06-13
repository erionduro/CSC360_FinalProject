import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5123/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      navigate('/login');
    } else {
      console.error('Registration failed');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md='6'>
          <form onSubmit={handleRegister}>
            <MDBInput
              label='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MDBBtn type='submit'>Register</MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default RegisterPage;