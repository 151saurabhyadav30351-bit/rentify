// Updated HERO SECTION content
import React from 'react';

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0', padding: '0', lineHeight: '1.2' }}>Welcome to Rentify</h1>
        <p style={{ fontSize: '1.2rem', padding: '10px 20px' }}>Your one-stop solution for renting a home effortlessly.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '100%' }}>
        <button style={{ padding: '10px 20px', fontSize: '1.1rem', margin: '10px' }}>Get Started</button>
        <button style={{ padding: '10px 20px', fontSize: '1.1rem', margin: '10px' }}>Learn More</button>
      </div>
    </div>
  );
};

export default Home;