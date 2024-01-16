import React, { useState } from 'react';

const RegistrationLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isRegisterMode) {
      // Perform registration logic here
      console.log('Registering user:', { email, password });
    } else {
      // Perform login logic here
      console.log('Logging in user:', { email, password });
    }

    // Clear form fields after submission
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">{isRegisterMode ? 'Register' : 'Login'}</button>
      </form>
      <p>
        {isRegisterMode
          ? 'Already have an account?'
          : 'Don\'t have an account yet?'}
        <button onClick={() => setIsRegisterMode(!isRegisterMode)}>
          {isRegisterMode ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
