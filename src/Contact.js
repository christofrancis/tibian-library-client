import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="container">
      <Navigation />
      <div className="contact-container mt-80">
        <div className="discord-container">
          <div>
            <iframe
              className="discord-iframe"
              title="discord"
              src="https://discord.com/widget?id=1046452658057265172&theme=dark"
              width="300"
              height="400"
              allowtransparency="true"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
