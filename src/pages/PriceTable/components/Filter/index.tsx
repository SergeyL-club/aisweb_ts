import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import PriceNotfFilter from "./PriceNotFilter";
import "./style.sass";

export enum StatusPrice {
  Active = "Active",
  myActive = "myActive",
  Canceled = "Canceled",
  finished = "Finished",
}

interface IStates {
  filter: string;
  active: number;
  myActive: number;
  autoPaid: boolean;
  filterPraid: string;
  minLimit: number;
  maxLimit: number;
}

export default class Filter extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      filter: "",
      active: 0,
      autoPaid: false,
      myActive: 0,
      filterPraid: "",
      minLimit: 0,
      maxLimit: 0,
    };
    this.update = this.update.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateMyActive = this.updateMyActive.bind(this);
    this.setAutoPaid = this.setAutoPaid.bind(this);
  }

  update(filter: string) {
    this.setState({ filter });
  }

  updateActive(count: number) {
    this.setState({ active: count });
  }
  updateMyActive(count: number) {
    this.setState({ myActive: count });
  }

  setFilter(filter: string) {
    this.context.socket.emit("set filter price", filter);
  }

  setAutoPaid(autoPaid: boolean) {
    this.setState({ autoPaid });
  }

  componentDidMount() {
    this.context.socket.on("set filter price", this.update);
    this.context.socket.on("priceActiveNumFilter", this.updateActive);
    this.context.socket.on("priceMyActivNumFilter", this.updateMyActive);
    this.context.socket.on("subscription autoPaid", this.setAutoPaid);
    this.context.socket.on("unsubscription autoPaid", this.setAutoPaid);
    this.context.socket.emit("subscription price active actual number");
    this.context.socket.emit("subscription price my active actual number");
  }

  componentWillUnmount() {
    this.context.socket.emit("unsubscription autoPaid");
    this.context.socket.off("set filter sale", this.update);
    this.context.socket.off("subscription autoPaid", this.setAutoPaid);
    this.context.socket.off("unsubscription autoPaid", this.setAutoPaid);
    this.context.socket.off("priceActiveNumFilter", this.updateActive);
    this.context.socket.off("priceMyActivNumFilter", this.updateMyActive);
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <div className="filterPrice">
        <div className="menuFilter">
          <div>
            <h2
              className={
                this.state.filter === StatusPrice.Active ? "active" : ""
              }
              onClick={() => this.setFilter(StatusPrice.Active)}
            >
              Активные
            </h2>
            {this.state.active && this.state.active > 0 ? (
              <PriceNotfFilter
                count={this.state.active}
                status={StatusPrice.Active}
              />
            ) : null}
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusPrice.myActive ? "active" : ""
              }
              onClick={() => this.setFilter(StatusPrice.myActive)}
            >
              Мои заявки
            </h2>
            {this.state.myActive && this.state.myActive > 0 ? (
              <PriceNotfFilter
                count={this.state.myActive}
                status={StatusPrice.myActive}
              />
            ) : null}
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusPrice.Canceled ? "active" : ""
              }
              onClick={() => this.setFilter(StatusPrice.Canceled)}
            >
              Отмененные
            </h2>
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusPrice.finished ? "active" : ""
              }
              onClick={() => this.setFilter(StatusPrice.finished)}
            >
              Завершенные
            </h2>
          </div>
        </div>
        {/* <div className="menuSearch">
          <input
            placeholder="Мнимальная сумма"
            type="number"
            onChange={(e) =>
              this.setState({ minLimit: Number(e.currentTarget.value.trim()) })
            }
          />
          <input
            placeholder="Максимальная сумма"
            type="number"
            onChange={(e) =>
              this.setState({ maxLimit: Number(e.currentTarget.value.trim()) })
            }
          />
          <input
            placeholder="Фильтер"
            type="text"
            onChange={(e) =>
              this.setState({ filterPraid: e.currentTarget.value.trim() })
            }
          />
          <button
            className={this.state.autoPaid ? "active" : ""}
            onClick={() => {
              this.context.socket.emit("subscription autoPaid", {
                filter: this.state.filterPraid,
                minLimit: this.state.minLimit,
                maxLimit: this.state.maxLimit,
              });
            }}
          >
            Авто покупки
          </button>
        </div> */}
      </div>
    );
  }
}
