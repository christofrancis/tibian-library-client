import React from "react";

const Footer = () => {
  return (
    <div className="footer bg-dark text-white copyright">
      <div>
        Tibian Library © 2022 - 2023 by christofrancis
        <br />
        <a target="blank" href="https://www.tibia.com/">
          Tibia
        </a>{" "}
        with its content is made and copyrighted by{" "}
        <a target="blank" href="https://www.cipsoft.com/">
          CipSoft GmbH
        </a>{" "}
        & Credits to{" "}
        <a target="blank" href="https://tibiamaps.io/">
          tibiamaps.io
        </a>{" "}
        for map data
      </div>
    </div>
  );
};

export default Footer;
