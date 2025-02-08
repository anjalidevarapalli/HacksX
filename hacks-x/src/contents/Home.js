import React, { useEffect, useState } from 'react';

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component mounts
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  return (
    <div className="home-container">
      <div className={`title-section ${visible ? "show" : ""}`}>
        <p className="description">
          Turn your daily schedule into a music festival.
        </p>
      </div>
    </div>
  );
};

export default Home;
