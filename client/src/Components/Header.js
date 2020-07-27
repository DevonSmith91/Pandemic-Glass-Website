import React from "react";
import Logo from "../Images/Logo.jpg";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div id="headerWrapper">
      <div id="leftHeader">
        <Link id="about" to="/about" onClick={props.locationHandler}>
          About Me
        </Link>
        <Link id="gallery" to="/gallery" onClick={props.locationHandler}>
          Gallery
        </Link>
      </div>

      <div id="headerLogoWrapper">
        <Link id="home" to="/home" onClick={props.locationHandler}>
          <img id="headerLogo" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div id="rightHeader">
        <Link id="merch" to="/merch" onClick={props.locationHandler}>
          Merch
        </Link>
        <Link id="contact" to="/contact" onClick={props.locationHandler}>
          Contact Me
        </Link>
      </div>
    </div>
  );
}
