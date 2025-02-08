import React from 'react';

const About = () => {
  const features = [
    {
      title: "Lyric Analysis",
      description: "Dive deep into your favorite songs with our advanced lyric analysis tools",
      icon: "🎵"
    },
    {
      title: "Artist Insights",
      description: "Discover unique patterns and themes in artists' writing styles",
      icon: "🎨"
    },
    {
      title: "Genre Exploration",
      description: "Explore how different genres use language and metaphors",
      icon: "🎸"
    },
    {
      title: "Mood Detection",
      description: "Understand the emotional journey of each song",
      icon: "🎭"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="title-section">
        <h1 className="title">About Lyric Analyzer</h1>
        <p className="description">
          Dive deep into the poetry of music with advanced AI-powered analysis
        </p>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <h4 className="stat-number">1M+</h4>
          <p className="stat-label">Songs Analyzed</p>
        </div>
        <div className="stat-card">
          <h4 className="stat-number">50K+</h4>
          <p className="stat-label">Active Users</p>
        </div>
        <div className="stat-card">
          <h4 className="stat-number">100+</h4>
          <p className="stat-label">Genres Covered</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="team-grid">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="team-card">
              <div className="team-image"></div>
              <h3 className="team-name">Team Member {member}</h3>
              <p className="team-role">Role</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;