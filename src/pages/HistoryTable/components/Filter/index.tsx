import React, { Component } from "react";
import "./style.sass";

export default class Filter extends Component {
  render() {
    return (
      <div className="filterHistory">
        <div className="menuFilter">
          <div>
            <h2>Моя история</h2>
          </div>
        </div>
        <div className="menuSearch"></div>
      </div>
    );
  }
}
