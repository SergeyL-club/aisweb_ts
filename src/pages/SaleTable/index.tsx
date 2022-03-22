import React, { Component } from "react";
import { SocketContext } from "../../context/socket.context";
import Filter from "./components/Filter";
import Footer from "./components/Footer";
import Table from "./components/Table";

export default class SaleTable extends Component {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

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
