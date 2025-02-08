import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  return (
    <div className="home-container">
      {/* Title Section */}
      <div className={`title-section ${visible ? "show" : ""}`}>
        <h1 className="main-title">YOUR LIFE, YOUR SOUNDTRACK.</h1>
        <p className="description">
          Automatically curated playlists based on your daily schedule. Sync your calendar and let the music flow.
        </p>
      </div>

      {/* Playlist Collage */}
      <div className="playlist-section">
        <a href="https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh" target="_blank" rel="noopener noreferrer" className="playlist-card">
        <img src={`${process.env.PUBLIC_URL}/assets/workoutplaylist.jpg`} alt="Workout Playlist" />
        </a>
        <a href="https://open.spotify.com/track/0WD60mK8KufcVX6hju2MeF" target="_blank" rel="noopener noreferrer" className="playlist-card">
          <img src={`${process.env.PUBLIC_URL}/assets/focusplaylist.jpg`} alt="Focus Playlist" />
        </a>
        <a href="https://open.spotify.com/playlist/37i9dQZF1EIfk2N1Y8uPoA" target="_blank" rel="noopener noreferrer" className="playlist-card">
          <img src={`${process.env.PUBLIC_URL}/assets/relaxplaylist.jpg`} alt="Relax Playlist" />
        </a>
        <a href="https://open.spotify.com/playlist/37i9dQZF1EIhxsZ1zwdwMW" target="_blank" rel="noopener noreferrer" className="playlist-card">
          <img src={`${process.env.PUBLIC_URL}/assets/morningplaylist.jpg`} alt="Morning Vibes" />
        </a>
      </div>
    </div>
  );
};

export default Home;
