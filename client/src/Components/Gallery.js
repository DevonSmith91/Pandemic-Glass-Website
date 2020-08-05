import React from "react";
import Carousel from "../Functions/Carousel.js";

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      personal: "none",
      collab: "none",
      perGallery: "",
      colGallery: "",
    };
  }

  openMe = (e) => {
    // User clicks on Personal Gallery
    if (e.target.id === "personalSubtitle") {
      //If the personal gallery isn't populated yet, it will fetch for the images for the gallery and set the object with the images into state
      if (!this.state.personalImages) {
        fetch("/personalImages")
          .then((res) => res.json())
          .then((res) => this.setState({ personalImages: res }));
      }
      // Then it will set the state to either show or hide the personal gallery
      this.setState((prevState) => {
        return {
          personal:
            this.state.perGallery === "showGallery"
              ? "none"
              : !prevState.personal,
          collab: "none",
          perGallery:
            this.state.perGallery === "showGallery"
              ? "hideGallery"
              : "showGallery",
          colGallery: this.state.colGallery === "" ? "" : "hideGallery",
        };
      });
    }
    // If the user clicks on the collab gallery
    if (e.target.id === "collabSubtitle") {
      // If the collab gallery isn't populated yet, it will fetch for the images for the gallery and set the object with the images into state
      if (!this.state.collabImages) {
        fetch("/collabImages")
          .then((res) => res.json())
          .then((res) => this.setState({ collabImages: res }));
      }
      // Then it will set the state to either show or hide the collab gallery
      this.setState((prevState) => {
        return {
          personal: "none",
          collab:
            this.state.colGallery === "showGallery"
              ? "none"
              : !prevState.collab,
          perGallery: this.state.perGallery === "" ? "" : "hideGallery",
          colGallery:
            this.state.colGallery === "showGallery"
              ? "hideGallery"
              : "showGallery",
        };
      });
    }
  };

  render() {
    let cGalImg = this.state.collabImages;
    return (
      <div id="galleryWrapper">
        <div id="personalWork">
          <div id="openPersonal" className="gallery">
            <div id="personalSubtitle" onClick={this.openMe}>
              Personal
            </div>
            <div id="galleryWindow" className={this.state.perGallery}>
              <div id="galleryContent" style={{ display: this.state.personal }}>
                {this.state.personalImages ? (
                  <div>Art goes here</div>
                ) : (
                  "Fill me with art!"
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="collabWork">
          <div id="openCollab" className="gallery">
            <div id="collabSubtitle" onClick={this.openMe}>
              Collaboration
            </div>
            <div id="galleryWindow" className={this.state.colGallery}>
              <div id="galleryContent" style={{ display: this.state.collab }}>
                {this.state.collabImages ? (
                  <Carousel cGalImg={cGalImg} />
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
