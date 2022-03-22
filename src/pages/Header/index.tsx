import React, { Component } from "react";
import "./style.sass";
import Navigation from "./components/Navigation";
import Account from "./components/Account";
import BidLine from "./components/BidLine";

interface IStates {
  isMobileMenu: boolean;
}
export default class Header extends Component<any, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      isMobileMenu: window.innerWidth < 1150,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1150) {
        this.setState({ isMobileMenu: true });
      } else {
        this.setState({ isMobileMenu: false });
      }
    });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <header>
        {!this.state.isMobileMenu ? <img src="/logo.svg" alt="Logo" /> : null}
        <Navigation />
        {this.state.isMobileMenu ? <BidLine /> : null}
        <Account />
      </header>
    );
  }
}
