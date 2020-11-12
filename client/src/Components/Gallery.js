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
    if (e.target.id === "personalSubtitle") {
      // fetching images for the personal gallery.
      if (!this.state.personalImages) {
        fetch("/personalImages")
          .then((res) => res.json())
          .then((res) => this.setState({ personalImages: res }));
      }
      // changes the state to show the personal gallery.
      this.setState((prevState) => {
        return {
          personal:
            this.state.perGallery === "showGallery"
              ? null
              : !this.state.personal,
          perGallery:
            this.state.perGallery === "showGallery"
              ? "hideGallery"
              : "showGallery",
          personalClass:
            this.state.perGallery === "showGallery"
              ? "galFadeAway"
              : "galFadeIn",
          colGallery: this.state.colGallery === "" ? "" : "hideGallery",
          collabClass:
            this.state.colGallery === "showGallery" ? "galFadeAway" : null,
        };
      });

      if (this.state.perGallery === "showGallery") {
        setTimeout(this.hidePerDisplay, 400);
      }
      if (this.state.colGallery === "showGallery") {
        setTimeout(this.hideColDisplay, 400);
      }
    }
    if (e.target.id === "collabSubtitle") {
      // collab fetch images.
      if (!this.state.collabImages) {
        fetch("/collabImages")
          .then((res) => res.json())
          .then((res) => this.setState({ collabImages: res }));
      }
      // collab change state.
      this.setState((prevState) => {
        return {
          collab:
            this.state.colGallery === "showGallery" ? null : !prevState.collab,
          collabClass:
            this.state.colGallery === "showGallery"
              ? "galFadeAway"
              : "galFadeIn",
          personalClass:
            this.state.perGallery === "showGallery" ? "galFadeAway" : null,
          perGallery: this.state.perGallery === "" ? "" : "hideGallery",
          colGallery:
            this.state.colGallery === "showGallery"
              ? "hideGallery"
              : "showGallery",
        };
      });
      if (this.state.perGallery === "showGallery") {
        setTimeout(this.hidePerDisplay, 400);
      }
      if (this.state.colGallery === "showGallery") {
        setTimeout(this.hideColDisplay, 400);
      }
    }
  };

  hidePerDisplay = () => {
    console.log("hello from hide Per display");
    this.setState({
      personal:
        this.state.perGallery === "showGallery" ? !this.state.personal : "none",
    });
  };

  hideColDisplay = () => {
    console.log("hello from hide Col display");
    this.setState({
      collab:
        this.state.ColGallery === "showGallery" ? !this.state.collab : "none",
    });
  };

  render() {
    let cGalImg = this.state.collabImages;
    // let pGalImg = this.state.personalImages;
    return (
      <div id="galleryWrapper">
        <div id="personalWork">
          <div id="openPersonal" className="gallery">
            <div id="personalSubtitle" onClick={this.openMe}>
              Personal
            </div>
            <div id="galleryWindow" className={this.state.perGallery}>
              <div
                className={this.state.personalClass}
                style={{ display: this.state.personal }}
              >
                {this.state.personalImages ? (
                  <div>Art goes here</div>
                ) : (
                  "Loading.."
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
              <div
                className={this.state.collabClass}
                style={{ display: this.state.collab }}
              >
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
