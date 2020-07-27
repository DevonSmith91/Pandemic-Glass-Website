import React from "react";
import Carousel from "react-bootstrap/carousel";
import Logo from "../Images/Logo.jpg";

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
    if (e.target.id === "collabSubtitle") {
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
    return (
      <div id="galleryWrapper">
        <div id="personalWork">
          <div id="openPersonal" className="gallery">
            <div id="personalSubtitle" onClick={this.openMe}>
            Personal
            </div>
            <div id="galleryWindow" className={this.state.perGallery}>
              <div id="galleryContent" style={{ display: this.state.personal }}>
                Fill me with art!



                {/* <Carousel indicators={false}>
                  <Carousel.Item>
                    <img
                      width={50}
                      className="d-block w-100"
                      src={Logo}
                      alt="First slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Logo}
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Logo}
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel> */}
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
                Fill me with Art!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
