import React, { Component } from "react";
import { Link } from "react-router-dom";

import Banner from "./Banner";
import Footer from "./footer";

class Main extends Component {
  render() {
    return (
      <>
        <div className="main">
          <Banner
            title="GRIP BANKING SYSTEM"
            subtitle="Thank you for banking with us"
          >
            <Link to="/transfer" className="btn-main">
              Transfer Fund
            </Link>
          </Banner>
        </div>
        <hr />
        <div className="section-footer">
          <Footer />
        </div>
      </>
    );
  }
}

export default Main;
