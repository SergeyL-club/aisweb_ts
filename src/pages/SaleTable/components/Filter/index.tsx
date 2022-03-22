import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import SaleNotfFilter from "./SaleNotfFilter";
import "./style.sass";

export enum StatusSell {
  active = "active",
  checking = "checking",
  recalculation = "recalculation",
  finished = "finished",
  canceled = "canceled",
  all = "all",
}

interface Stats {
  filter: string;
  active: number;
  checking: number;
}

export default class Filter extends Component<any, Stats> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      filter: "",
      active: 0,
      checking: 0,
    };
    this.update = this.update.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateChecking = this.updateChecking.bind(this);
  }

  update(filter: string) {
    this.setState({ filter });
  }

  updateActive(count: number) {
    this.setState({ active: count });
  }

  updateChecking(count: number) {
    this.setState({ checking: count });
  }

  componentDidMount() {
    this.context.socket.on("set filter sale", this.update);
    this.context.socket.emit("subscription sale checking actual number");
    this.context.socket.emit("subscription sale active actual number");
    this.context.socket.on("saleCheckingNumFilter", this.updateChecking);
    this.context.socket.on("saleActiveNumFilter", this.updateActive);
  }

  componentWillUnmount() {
    this.context.socket.off("set filter sale", this.update);
    this.context.socket.off("saleCheckingNumFilter", this.updateChecking);
    this.context.socket.off("saleActiveNumFilter", this.updateChecking);
    this.setState = (state, callback) => {
      return;
    };
  }

  setFilter(filter: string) {
    this.context.socket.emit("set filter sale", filter);
  }

  render() {
    return (
      <div className="filterSale">
        <div className="menuFilter">
          <div>
            <h2
              className={
                this.state.filter === StatusSell.active ? "active" : ""
              }
              onClick={() => this.setFilter(StatusSell.active)}
            >
              Активные
            </h2>
            {this.state.active && this.state.active > 0 ? (
              <SaleNotfFilter
                count={this.state.active}
                status={StatusSell.active}
              />
            ) : null}
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusSell.checking ? "active" : ""
              }
              onClick={() => this.setFilter(StatusSell.checking)}
            >
              На проверке
            </h2>
            {this.state.checking && this.state.checking > 0 ? (
              <SaleNotfFilter
                count={this.state.checking}
                status={StatusSell.checking}
              />
            ) : null}
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusSell.recalculation ? "active" : ""
              }
              onClick={() => this.setFilter(StatusSell.recalculation)}
            >
              Пересчитанные
            </h2>
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusSell.finished ? "active" : ""
              }
              onClick={() => this.setFilter(StatusSell.finished)}
            >
              Завершенные
            </h2>
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusSell.canceled ? "active" : ""
              }
              onClick={() => this.setFilter(StatusSell.canceled)}
            >
              Отмененные
            </h2>
          </div>
          <div>
            <h2
              className={this.state.filter === StatusSell.all ? "active" : ""}
              onClick={() => this.setFilter(StatusSell.all)}
            >
              Все
            </h2>
          </div>
        </div>
        <div className="menuSearch"></div>
      </div>
    );
  }
}
