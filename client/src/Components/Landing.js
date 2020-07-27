import { Link } from "react-router-dom";
import Logo from "../Images/Logo.jpg";
import "../Styles/App.css";
import React from "react";

export default function Landing(props) {
  return (
    <div id="landingWrapper">
      <div id="landingLogoWrapper">
        <img id="landingLogo" src={Logo} alt="Logo" />
      </div>
      <span id="verification">You must be 21 or older to enter</span>
      <div id="landingButtonContainer">
        <Link id="landingHome" to="home" onClick={props.locationHandler}>
          <div id="home" className="landingButton hvr-ripple-out">
            Enter
          </div>
        </Link>
        <a
          id="landingExit"
          className="landingButton hvr-ripple-out"
          href="https://www.google.com"
        >
          Exit
        </a>
      </div>
    </div>
  );
}
