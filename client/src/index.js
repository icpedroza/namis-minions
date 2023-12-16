// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { Auth0Provider } from '@auth0/auth0-react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import LoginButton from './login';
// import LogoutButton from './logout';
// import Profile from './profile';

// const { user, isAuthenticated, isLoading } = useAuth0();

// const root = createRoot(document.getElementById('root'));
// root.render(
// <Auth0Provider
//     domain="dev-hytlp1znv5tv84fc.us.auth0.com"
//     clientId="cqHqQQw1o0kYfmRXJnOGUFQXyffe5PKJ"
//     authorizationParams={{
//       redirect_uri: window.location.origin
//     }}
//   >
//     <LoginButton />
//     <LogoutButton />
//     {isAuthenticated ? <App /> : <div>Please log in</div>}    
//     {/* <App /> */}
//   </Auth0Provider>,
// );


import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import App from './App';
import LoginButton from './login';
import LogoutButton from './logout';

const AuthenticatedApp = () => {
  // const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LoginButton />
      <LogoutButton />
      {isAuthenticated ? <App /> : <div>Please log in</div>}
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-hytlp1znv5tv84fc.us.auth0.com"
    clientId="cqHqQQw1o0kYfmRXJnOGUFQXyffe5PKJ"
    redirectUri={window.location.origin}
  >
    <LoginButton />
    <LogoutButton />
    <App />
    {/* <AuthenticatedApp /> */}
  </Auth0Provider>
);