import { Route, Switch } from "react-router-dom";
import Contact from "./Contact";
import Landing from "./Landing";
import Header from "./Header";
import Merch from "./Merch";
import Gallery from "./Gallery";
import About from "./About";
import Home from "./Home";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "",
    };
  }

  componentDidMount() {
    window.onpopstate = this.browserButtonHandler;
    let urlLocation = window.location.pathname;
    if (this.state.location !== urlLocation) {
      this.setState({
        location: urlLocation,
      });
    }
  }

  browserButtonHandler = (e) => {
    this.setState({
      location: e.target.location.pathname,
    });
  };

  locationHandler = (e) => {
    this.setState({
      location: `/${e.target.id}`,
    });
  };

  render() {
    let header;
    if (this.state.location !== "/") {
      header = <Header locationHandler={this.locationHandler} />;
    }
    return (
      <div>
        {header}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Landing
                pageUpdate={this.pageUpdate}
                locationHandler={this.locationHandler}
              />
            )}
          />
          <Route path="/home" render={() => <Home />} />
          <Route path="/about" render={() => <About />} />
          <Route path="/gallery" render={() => <Gallery />} />
          <Route path="/merch" render={() => <Merch />} />
          <Route path="/contact" render={() => <Contact />} />
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}
