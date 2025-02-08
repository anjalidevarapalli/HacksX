import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const GoogleCalendarIntegration = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchGoogleCalendar = async () => {
        try {
          // Get access token with proper audience and scope
          const accessToken = await getAccessTokenSilently({
            audience: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            scope: 'openid profile email https://www.googleapis.com/auth/calendar.readonly',
          });

          // Fetch calendar events with the access token
          const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Calendar events:', data.items);
          // Process and display events here
          
        } catch (error) {
          console.error('Error fetching calendar data:', error);
        }
      };

      fetchGoogleCalendar();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Fetching Google Calendar events...</p>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

export default GoogleCalendarIntegration;
// import React, { useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

// const GoogleCalendarIntegration = () => {
//   const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

//   useEffect(() => {
//     if (isAuthenticated) {
//       // Get the access token to access Google Calendar
//       const fetchGoogleCalendar = async () => {
//         try {
//           const accessToken = await getAccessTokenSilently({
//             audience: `https://www.googleapis.com/auth/calendar.readonly`,
//             scope: 'openid profile email https://www.googleapis.com/auth/calendar.readonly',
//           });

//           // Send the access token to your backend to fetch calendar events
//           fetchCalendarEvents(accessToken);
//         } catch (error) {
//           console.error('Error getting access token:', error);
//         }
//       };

//       fetchGoogleCalendar();
//     }
//   }, [isAuthenticated, getAccessTokenSilently]);

//   // Function to fetch calendar events from the backend
//   const fetchCalendarEvents = (accessToken) => {
//     fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,  // Send the access token here
//       },
//       body: JSON.stringify({ accessToken }),
//     })
//       .then(response => {
//         response.json(); 
//         console.log("hi")
//       })
//       .then(data => {
//         console.log('Calendar events:', data);
//         // You can now display the calendar events here
//       })
//       .catch(error => console.error('Error fetching calendar events:', error));
//   };

//   return (
//     <div>
//       {isAuthenticated ? (
//         <div>
//           <h2>Welcome, {user.name}</h2>
//           <p>Fetching Google Calendar events...</p>
//         </div>
//       ) : (
//         <p>Please log in</p>
//       )}
//     </div>
//   );
// };

// export default GoogleCalendarIntegration;
