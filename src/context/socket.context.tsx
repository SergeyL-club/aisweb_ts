import React, { Component, createContext } from "react";
import { io } from "socket.io-client";
import {
  HistoryArray,
  ISocketContext,
  IState,
  PriceArray,
  PriceNA,
  PriceNMA,
  ResAccountInfo,
  SaleArray,
  SaleNA,
  SaleNC,
  StatusNav,
  WalletArray,
} from "./interfaces";

const socket = io("https://aisweb.xyz:8080", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 99999,
  forceNew: true,
});

export const SocketContext = createContext<ISocketContext>({
  socket,
  isAuth: false,
  nav: StatusNav.price,
  accountInfo: undefined,
  isLoad: true,
  isSave: false,
  saleNotf: undefined,
  walletArray: undefined,
  priceNotf: undefined,
  setNav: () => false,
  saleArrays: undefined,
  setIsAuth: () => false,
  setIsSave: () => false,
  priceArrays: undefined,
  historyArray: undefined,
  rate: 0,
  percent: 0,
});

export default class SocketProvider extends Component<any, IState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      saleArray: undefined,
      saleNotf: undefined,
      isAuth: false,
      historyArray: undefined,
      priceArray: undefined,
      rate: 0,
      percent: 0,
      walletArray: undefined,
      accountInfo: undefined,
      priceNotf: undefined,
      isSave: localStorage.getItem("isSave") === "true",
      isLoad: true,
      nav: StatusNav.price,
    };
  }

  componentDidMount() {
    socket.on("disconnect", () => {
      this.setState({ isAuth: false });
    });
    socket.on(
      "auth",
      (
        data:
          | { status: "success"; token: string }
          | { status: "error"; description: string }
      ) => {
        if (data.status === "success") {
          console.log("auth ok");
          if (this.state.isSave) {
            localStorage.setItem("token", data.token);
          } else {
            localStorage.removeItem("token");
            this.setState({ isSave: false, isLoad: false });
          }
          socket.emit("subscription rate");
          socket.emit("subscription account info");
          socket.emit("subscription price actual number");
          socket.emit("subscription sale actual number");
          socket.emit(`subscription nav ${this.state.nav}`);
          this.setState({ isAuth: true, isLoad: false });
        } else {
          console.log("auth failed");
          localStorage.removeItem("token");
          this.setState({ isSave: false, isLoad: false });
        }
      }
    );

    socket.on(
      "account",
      (
        data:
          | {
              status: "success";
              alias: string;
              depositToken: string;
              data: ResAccountInfo;
            }
          | { status: "Error"; description: string }
      ) => {
        if (data.status === "success") {
          this.setState({
            accountInfo: {
              ...data.data,
              alias: data.alias,
              depositToken: data.depositToken,
            },
          });
          document.title = `${data.data.direction.toLocaleUpperCase()} ${
            data.alias ? `(${data.alias})` : ""
          } | AisWeb`;
        }
      }
    );

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      } else if (reason === "io client disconnect") {
        socket.connect();
      }
    });

    socket.on("priceActNum", (data: PriceNA | PriceNMA | null) => {
      if (!data) {
        this.setState({ priceNotf: undefined });
      } else {
        this.setState({ priceNotf: data });
      }
    });
    socket.on("saleActNum", (data: SaleNA | SaleNC | null) => {
      if (!data) {
        this.setState({ saleNotf: undefined });
      } else {
        this.setState({ saleNotf: data });
      }
    });

    socket.on("saleOrders", (data: SaleArray) => {
      this.setState({ saleArray: data });
    });

    socket.on("priceOrders", (data: PriceArray) => {
      this.setState({ priceArray: data });
    });
    socket.on("historyLogs", (data: HistoryArray) => {
      this.setState({ historyArray: data });
    });
    socket.on("wallets", (data: WalletArray) => {
      this.setState({ walletArray: data });
    });

    socket.on(
      "rate",
      (
        data:
          | { status: "success"; rate: number; percent: number }
          | { status: "Error"; description: string }
      ) => {
        if (data.status === "success") {
          this.setState({ rate: data.rate, percent: data.percent });
        }
      }
    );

    socket.on("connect", () => {
      if (this.state.isSave) {
        let token = localStorage.getItem("token");
        if (token) {
          socket.emit("auth", { token });
        } else {
          this.setState({ isSave: false, isLoad: false });
        }
      } else {
        localStorage.removeItem("token");
        this.setState({ isLoad: false });
      }
    });

    socket.on("set filter price", () => {
      this.setState({ priceArray: undefined });
    });

    socket.on("set filter sale", () => {
      this.setState({ saleArray: undefined });
    });
    socket.on("set page sale", (page: number) => {
      if (this.state.saleArray) {
        this.setState({
          saleArray: {
            maxPage: this.state.saleArray.maxPage,
            page: page,
            orders: undefined,
          },
        });
      }
    });
    socket.on("set page wallet", (page: number) => {
      if (this.state.walletArray) {
        this.setState({
          walletArray: {
            maxPage: this.state.walletArray.maxPage,
            page: page,
            wallets: undefined,
          },
        });
      }
    });
    socket.on("set page price", (page: number) => {
      if (this.state.priceArray) {
        this.setState({
          priceArray: {
            maxPage: this.state.priceArray.maxPage,
            page: page,
            orders: undefined,
          },
        });
      }
    });
    socket.on("set page history", (page: number) => {
      if (this.state.historyArray) {
        this.setState({
          historyArray: {
            maxPage: this.state.historyArray.maxPage,
            page: page,
            logs: undefined,
          },
        });
      }
    });
  }

  componentDidUpdate(props: any, state: IState) {
    if (this.state.isSave !== state.isSave) {
      localStorage.setItem("isSave", String(this.state.isSave));
    }
    if (
      this.state.priceNotf &&
      this.state.priceNotf.status === "myActive" &&
      ((state.priceNotf &&
        state.priceNotf.status === "myActive" &&
        this.state.priceNotf.number > state.priceNotf.number) ||
        !state.priceNotf)
    ) {
      let audio = new Audio("/audio.mp3");
      audio.play();
    }
    if (this.state.nav !== state.nav) {
      this.setState({
        saleArray: undefined,
        historyArray: undefined,
        priceArray: undefined,
        walletArray: undefined,
      });
      socket.emit(`subscription nav ${this.state.nav}`);
    }
  }

  render() {
    return (
      <SocketContext.Provider
        value={{
          socket,
          historyArray: this.state.historyArray,
          priceArrays: this.state.priceArray,
          saleArrays: this.state.saleArray,
          rate: this.state.rate,
          walletArray: this.state.walletArray,
          percent: this.state.percent,
          isLoad: this.state.isLoad,
          priceNotf: this.state.priceNotf,
          accountInfo: this.state.accountInfo,
          saleNotf: this.state.saleNotf,
          isAuth: this.state.isAuth,
          isSave: this.state.isSave,
          nav: this.state.nav,
          setNav: (status: string) => this.setState({ nav: status }),
          setIsAuth: (bol: boolean) => this.setState({ isAuth: bol }),
          setIsSave: (bol: boolean) => this.setState({ isSave: bol }),
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}
