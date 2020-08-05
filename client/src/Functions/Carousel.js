import React, { useState } from "react";

export default function Carousel(props) {
  let imgArray = [];
  props.cGalImg.forEach((img) => {
    imgArray.push(img.url);
  });

  const [index, setIndex] = useState(0);

  const handleNav = (e) => {
    console.log(e.target.id);
    console.log(index);
    let newIndex;
    if (e.target.id === "right") {
      index === imgArray.length - 1 ? (newIndex = 0) : (newIndex = index + 1);
    } else {
      index === 0 ? (newIndex = imgArray.length - 1) : (newIndex = index - 1);
    }
    setIndex(newIndex);
  };

  return (
    <div id="rotatingCarousel">
      <div id="left" onClick={handleNav}>
        Left
      </div>

      <div id="imageContainer">
        
        <img
          className="smallImage"
          src={
            index === 0 ? imgArray[imgArray.length - 1] : imgArray[index - 1]
          }
          alt="thumbnail"
        />

        <img
          className="largeImage"
          src={imgArray[index]}
          alt="middle thumbnail"
        />

        <img
          className="smallImage"
          src={
            index === imgArray.length - 1 ? imgArray[0] : imgArray[index + 1]
          }
          alt="thumbnail"
        />

      </div>

      <div id="right" onClick={handleNav}>
        Right
      </div>
    </div>

  );
}
