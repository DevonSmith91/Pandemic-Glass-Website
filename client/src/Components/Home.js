import React, { Component } from "react";

export default function Home() {
  return (
    <div id="homeWrapper">
      <iframe
        title="Working Video"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/Xqsu477pe-Y?rel=0;autoplay=1;controls=0;modestbranding=1;showinfo=0;autohide=1&playlist=Xqsu477pe-Y&loop=1"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}
