import React, { Component } from "react";
import Filter from "./components/Filter";
import Footer from "./components/Footer";
import Table from "./components/Table";

export default class HistoryTable extends Component {
  render() {
    return (
      <>
        <Filter />
        <Table />
        <Footer />
      </>
    );
  }
}
