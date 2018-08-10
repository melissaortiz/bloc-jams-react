import React from 'react';
import headerImage from '../lights-party-dancing-music.jpg';

const Landing = () => (
	<section className="landing">
	<h1 className="hero-title">
	<div className="main-point">Turn the music up!</div>
	<img src={headerImage} alt="concert" className="headerImage" />
	</h1>

	<section className="selling-points">
	 <div className="point">
	  <h2 className="point-title">Choose your music</h2>
	  <p className="point-description">The world is full of music;</p>
	  <p className="point-description">why should you have to listen to music someone else chose?</p>
	 </div>
	 <div className="point">
	  <h2 className="point-title">unlimited, streaming, ad-free</h2>
	  <p className="point-description">Listen to your music on the go.</p>
	  <p className="point-description">This streaming service is available on all mobile platforms.</p>
	 </div>
	</section>
	</section>
	);

	export default Landing;