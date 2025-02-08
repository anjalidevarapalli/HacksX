import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      {/* Title Section */}
      <div className="title">
        Lyric Analyzer
      </div>

      {/* Featured Albums Section */}
      <section className="featured-albums">
        <h2>Featured Albums</h2>
        <div className="albums">
          <div className="album">
            <img src="/assets/album1.jpg" alt="Album 1" />
            <h3>Album Name 1</h3>
            <p>Artist Name</p>
          </div>
          <div className="album">
            <img src="/assets/album2.jpg" alt="Album 2" />
            <h3>Album Name 2</h3>
            <p>Artist Name</p>
          </div>
          <div className="album">
            <img src="/assets/album3.jpg" alt="Album 3" />
            <h3>Album Name 3</h3>
            <p>Artist Name</p>
          </div>
          <div className="album">
            <img src="/assets/album4.jpg" alt="Album 4" />
            <h3>Album Name 4</h3>
            <p>Artist Name</p>
          </div>
        </div>
      </section>

      {/* Popular Artists Section */}
      <section className="artists">
        <h2>Popular Artists</h2>
        <div className="artist-cards">
          <div className="artist-card">
            <img src="/assets/artist1.jpg" alt="Artist 1" />
            <h3>Artist Name 1</h3>
          </div>
          <div className="artist-card">
            <img src="/assets/artist2.jpg" alt="Artist 2" />
            <h3>Artist Name 2</h3>
          </div>
          <div className="artist-card">
            <img src="/assets/artist3.jpg" alt="Artist 3" />
            <h3>Artist Name 3</h3>
          </div>
          <div className="artist-card">
            <img src="/assets/artist4.jpg" alt="Artist 4" />
            <h3>Artist Name 4</h3>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Music Stream App © 2025</p>
      </footer>
    </div>
  );
};

export default Home;
