import React, { Component } from "react";
import { StatusNav } from "../../../../context/interfaces";
import { SocketContext } from "../../../../context/socket.context";
import PriceNotf from "./PriceNotf";
import SaleNotf from "./SaleNotf";
import "./style.sass";

interface IStates {
  isMobileMenu: boolean;
  isMenu: boolean;
}
export default class Navigation extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isMobileMenu: window.innerWidth < 1150,
      isMenu: false,
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
      <>
        {!this.state.isMobileMenu ? (
          <div className="navigation">
            <div>
              <h1
                onClick={() => this.context.setNav(StatusNav.price)}
                className={this.context.nav === StatusNav.price ? "active" : ""}
              >
                Покупка BTC
              </h1>
              <PriceNotf />
            </div>
            <div>
              <h1
                onClick={() => this.context.setNav(StatusNav.sale)}
                className={this.context.nav === StatusNav.sale ? "active" : ""}
              >
                Продажа BTC
              </h1>
              <SaleNotf />
            </div>
            <div>
              <h1
                onClick={() => this.context.setNav(StatusNav.wallets)}
                className={
                  this.context.nav === StatusNav.wallets ? "active" : ""
                }
              >
                Кошельки
              </h1>
            </div>
          </div>
        ) : (
          <div className="mobileNavigation">
            <img
              onClick={() => this.setState({ isMenu: !this.state.isMenu })}
              src="/mobileMenu.svg"
              alt="mobileMenu"
            />
            {this.state.isMenu ? (
              <div className="menu">
                <div>
                  <h1
                    onClick={() => {
                      this.context.setNav(StatusNav.price);
                      this.setState({ isMenu: false });
                    }}
                    className={
                      this.context.nav === StatusNav.price ? "active" : ""
                    }
                  >
                    Покупка BTC
                  </h1>
                  <PriceNotf />
                </div>
                <div>
                  <h1
                    onClick={() => {
                      this.context.setNav(StatusNav.sale);
                      this.setState({ isMenu: false });
                    }}
                    className={
                      this.context.nav === StatusNav.sale ? "active" : ""
                    }
                  >
                    Продажа BTC
                  </h1>
                  <SaleNotf />
                </div>
                <div>
                  <h1
                    onClick={() => {
                      this.context.setNav(StatusNav.wallets);
                      this.setState({ isMenu: false });
                    }}
                    className={
                      this.context.nav === StatusNav.wallets ? "active" : ""
                    }
                  >
                    Кошельки
                  </h1>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </>
    );
  }
}
