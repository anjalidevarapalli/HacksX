import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      ) : (
        <div>
          <h2>Hello, {user.name}!</h2>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default App;

