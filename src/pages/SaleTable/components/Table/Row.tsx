import React, { Component } from "react";
import { StatusOrder } from ".";
import { OrderSale } from "../../../../context/interfaces";
import { prettify, prettifyPhone } from "../../../../functions/prettify";
import { showDiff } from "../../../../functions/showDiff";
import { StatusSell } from "../Filter";
import CopyComponent from "react-copy-to-clipboard";
import { SocketContext } from "../../../../context/socket.context";

interface IProps {
  order: OrderSale;
  status: string;
  updateSale: (preInput: string, preId: string) => void;
  openUpdate: () => void;
}

interface IStates {
  time: {
    d: number;
    h: number;
    i: number;
    s: number;
  };
  isMenu: boolean;
  copyRequisites: boolean;
  copyDate: boolean;
  copyId: boolean;
}
export default class Row extends Component<IProps, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      time: {
        d: 0,
        h: 0,
        i: 0,
        s: 0,
      },
      isMenu: false,
      copyRequisites: false,
      copyDate: false,
      copyId: false,
    };
  }

  updateTimeOut = setInterval(() => {
    let newDate = new Date();
    let [needDate, needTime] = this.props.order.created_at
      .split(",")
      .slice(0, 2);

    let needFormat = new Date(
      2000 + Number(needDate.split(".")[2]),
      Number(needDate.split(".")[1]),
      Number(needDate.split(".")[0]),
      Number(needTime.split(":")[0]) +
        Math.abs(newDate.getTimezoneOffset() / 60) -
        3,
      Number(needTime.split(":")[1]) + Number(this.props.order.time_window) + 3,
      0
    );

    this.setState({ time: showDiff(needFormat, newDate) });
  }, 1000);

  componentDidMount() {
    let newDate = new Date();
    let [needDate, needTime] = this.props.order.created_at
      .split(",")
      .slice(0, 2);

    let needFormat = new Date(
      2000 + Number(needDate.split(".")[2]),
      Number(needDate.split(".")[1]),
      Number(needDate.split(".")[0]),
      Number(needTime.split(":")[0]) +
        Math.abs(newDate.getTimezoneOffset() / 60) -
        3,
      Number(needTime.split(":")[1]) + Number(this.props.order.time_window) + 3,
      0
    );

    this.setState({ time: showDiff(needFormat, newDate) });
  }

  componentWillUnmount() {
    clearInterval(this.updateTimeOut);
  }

  render() {
    return (
      <>
        <tr>
          <td className={this.props.order.status.toLowerCase()}>
            {StatusOrder[this.props.order.status] !== undefined
              ? StatusOrder[this.props.order.status]
              : this.props.order.status}
          </td>
          <td>
            <CopyComponent
              onCopy={() => {
                this.setState({ copyId: true });
                setTimeout(() => this.setState({ copyId: false }), 1 * 1000);
              }}
              text={this.props.order.id}
            >
              <p style={{ cursor: "pointer" }}>{this.props.order.id}</p>
            </CopyComponent>
            {this.state.copyId ? (
              <span className="copy">Скопировано</span>
            ) : null}
          </td>
          <td>
            <CopyComponent
              onCopy={() => {
                this.setState({ copyRequisites: true });
                setTimeout(
                  () => this.setState({ copyRequisites: false }),
                  1 * 1000
                );
              }}
              text={this.props.order.requisities}
            >
              <h2 style={{ cursor: "pointer" }}>
                {this.props.order.requisities[0] === "+"
                  ? prettifyPhone(this.props.order.requisities)
                  : prettify(Number(this.props.order.requisities), 4)}
              </h2>
            </CopyComponent>
            {this.state.copyRequisites ? (
              <span className="copy">Скопировано</span>
            ) : null}
            <h2>{this.props.order.wallet_description}</h2>
          </td>
          <td>{this.props.order.btc_amount}</td>
          <td>
            <h2>{prettify(Number(this.props.order.fiat_amount), 3)}</h2>
            <h2>RUB</h2>
          </td>
          <td
            style={
              this.props.order.status ===
                StatusSell.finished[0].toLocaleUpperCase() +
                  StatusSell.finished.slice(1, StatusSell.finished.length) &&
              this.props.status === StatusSell.all
                ? { paddingRight: 0 }
                : {}
            }
          >
            {this.props.order.status === "Paid" ||
            this.props.order.status === "Seller requisite" ? (
              <>
                <CopyComponent
                  onCopy={() => {
                    this.setState({ copyDate: true });
                    setTimeout(
                      () => this.setState({ copyDate: false }),
                      1 * 1000
                    );
                  }}
                  text={this.props.order.created_at}
                >
                  <h2
                    className={
                      this.props.status !== StatusSell.finished &&
                      this.props.order.status !==
                        StatusSell.finished[0].toLocaleUpperCase() +
                          StatusSell.finished.slice(
                            1,
                            StatusSell.finished.length
                          )
                        ? "noPadding"
                        : ""
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {this.props.order.created_at}
                  </h2>
                </CopyComponent>
                {this.state.copyDate ? (
                  <span className="copy">Скопировано</span>
                ) : null}
                <h2 className="time">
                  {`${this.state.time.i.toString().length < 2 ? "0" : ""}${
                    this.state.time.i
                  }`}
                  :
                  {`${this.state.time.s.toString().length < 2 ? "0" : ""}${
                    this.state.time.s
                  } `}
                  до закрытия
                </h2>
              </>
            ) : (
              <>
                <CopyComponent
                  onCopy={() => {
                    this.setState({ copyDate: true });
                    setTimeout(
                      () => this.setState({ copyDate: false }),
                      1 * 1000
                    );
                  }}
                  text={this.props.order.created_at}
                >
                  <p style={{ cursor: "pointer" }}>
                    {this.props.order.created_at}
                  </p>
                </CopyComponent>
                {this.state.copyDate ? (
                  <span className="copy">Скопировано</span>
                ) : null}
              </>
            )}
          </td>
          {this.props.status !== StatusSell.finished &&
          this.props.order.status !==
            StatusSell.finished[0].toLocaleUpperCase() +
              StatusSell.finished.slice(1, StatusSell.finished.length) ? (
            <td>
              <button
                style={{ cursor: "pointer" }}
                onClick={() => this.setState({ isMenu: !this.state.isMenu })}
                className="menuAnswers"
              >
                Действие
              </button>

              {this.state.isMenu ? (
                <div className="menuAnswers">
                  <div>
                    <h2
                      onClick={() => {
                        this.setState({ isMenu: false });
                        this.context.socket.emit(
                          "accept paid order",
                          this.props.order.id
                        );
                      }}
                      className="acceptTranButton"
                    >
                      Успешно
                    </h2>
                  </div>
                  <div style={{ paddingBottom: "25px" }}>
                    <h2
                      className="editTrannButton"
                      onClick={() => {
                        this.setState({ isMenu: false });
                        this.props.updateSale(
                          this.props.order.fiat_amount,
                          this.props.order.id
                        );
                        this.props.openUpdate();
                      }}
                    >
                      Изменить цену
                    </h2>
                  </div>
                  {this.props.status === StatusSell.checking ? (
                    <div>
                      <h2
                        className="cancelTrannButton"
                        onClick={() => {
                          this.context.socket.emit(
                            "cancel paid order",
                            this.props.order.id
                          );
                          this.setState({ isMenu: false });
                        }}
                      >
                        Отменить
                      </h2>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </td>
          ) : null}
        </tr>
      </>
    );
  }
}
