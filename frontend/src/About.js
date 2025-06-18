import React from 'react';
import './about.css';

function About(){
    return(
         <main className="about-container">
      <section className="about-hero">
        <h1>About PetZone</h1>
        <p>
          Welcome to PetZone, your trusted ethical pet marketplace. We connect loving families
          with responsible breeders, shelters, and pet services, ensuring every pet finds a safe
          and happy home.
        </p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          At PetZone, our mission is to promote animal welfare by providing a transparent,
          ethical, and community-driven platform. We believe every pet deserves love, care,
          and respect.
        </p>
      </section>

      <section className="about-values">
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Ethical Sourcing:</strong> We partner only with verified breeders and
            shelters who prioritize animal well-being.
          </li>
          <li>
            <strong>Transparency:</strong> All listings include detailed information about
            pets, their backgrounds, and care requirements.
          </li>
          <li>
            <strong>Community:</strong> We foster a supportive community for pet lovers,
            offering resources and guidance for responsible pet ownership.
          </li>
          <li>
            <strong>Support:</strong> Our team is here to help you every step of the way,
            from adoption to lifelong care.
          </li>
        </ul>
      </section>

      <section className="about-join">
        <h2>Join Us</h2>
        <p>
          Whether you’re looking to adopt, foster, or support animal welfare, PetZone is here
          for you. Together, we can make a difference—one pet at a time.
        </p>
      </section>
    </main>
    )
}

export default About;