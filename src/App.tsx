import React, { Component } from "react";
import { StatusNav } from "./context/interfaces";
import { SocketContext } from "./context/socket.context";
import AuthForm from "./pages/AuthForm";
import Bid from "./pages/Bid";
import Header from "./pages/Header";
import HistoryTable from "./pages/HistoryTable";
import LoadingPage from "./pages/LoadingPage";
import NotfForm from "./pages/NotfForm";
import PriceTable from "./pages/PriceTable";
import SaleTable from "./pages/SaleTable";
import Stats from "./pages/Stats";
import WalletTable from "./pages/WalletTable";

interface IStates {
  isMobileMenu: boolean;
}
export default class App extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

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
      <>
        {this.context.isLoad ? <LoadingPage /> : null}
        {!this.context.isAuth && !this.context.isLoad ? <AuthForm /> : null}
        {this.context.isAuth && !this.context.isLoad ? (
          <>
            <NotfForm />
            <Header />
            {!this.state.isMobileMenu ? <Bid /> : null}
            <Stats />
            {this.context.nav === StatusNav.sale ? <SaleTable /> : null}
            {this.context.nav === StatusNav.price ? <PriceTable /> : null}
            {this.context.nav === StatusNav.history ? <HistoryTable /> : null}
            {this.context.nav === StatusNav.wallets ? <WalletTable /> : null}
          </>
        ) : null}
      </>
    );
  }
}
