import React, { Component } from "react";
import { OrderPrice } from "../../../../context/interfaces";
import { SocketContext } from "../../../../context/socket.context";
import { prettify } from "../../../../functions/prettify";
import { showDiff } from "../../../../functions/showDiff";
import { StatusOrder } from "../../../SaleTable/components/Table";
import { StatusPrice } from "../Filter";
import CopyComponent from "react-copy-to-clipboard";
interface IProps {
  order: OrderPrice;
  status: string;
}

interface IStates {
  time: {
    d: number;
    h: number;
    i: number;
    s: number;
  };
  isMenu: boolean;
  copyDate: boolean;
  copyBTC: boolean;
  copyRequisites: boolean;
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
      copyDate: false,
      copyBTC: false,
      copyRequisites: false,
      copyId: false,
    };
  }

  setAcceptOrder(exchange_id: number) {
    this.context.socket.emit("accept price order", exchange_id);
  }
  cancelAcceptOrder(exchange_id: number) {
    this.context.socket.emit("cancel translation price order", exchange_id);
  }
  acceptOrder(exchange_id: number) {
    this.context.socket.emit("accept translation price order", exchange_id);
  }

  checkUpdatePercent() {
    let youBtcRate =
      Math.floor((this.context.rate / 100) * this.context.percent) +
      this.context.rate;
    let rateMinus = youBtcRate - this.props.order.rate;
    let rateDivision = rateMinus / this.props.order.rate;
    let rateMultiplication = rateDivision * 100;
    let rateRounding = Math.floor(rateMultiplication * 100) / 100;

    // if (Math.floor((rateRounding / 3) * 100) / 100 >= 0.5) {
    //   return (Math.floor((rateRounding / 3) * 100) / 100) * 2;
    // } else {
    return rateRounding;
    // }
  }

  updateTimeOut = setInterval(() => {
    if (this.props.status === StatusPrice.myActive) {
      let newDate = new Date();
      let [needDate, needTime] = this.props.order.need_pay_to
        .split(",")
        .slice(0, 2);

      let needFormat = new Date(
        2000 + Number(needDate.split(".")[2]),
        Number(needDate.split(".")[1]),
        Number(needDate.split(".")[0]),
        Number(needTime.split(":")[0]) +
          Math.abs(newDate.getTimezoneOffset() / 60) -
          3,
        Number(needTime.split(":")[1]),
        0
      );

      this.setState({ time: showDiff(newDate, needFormat) });
    }
  }, 1000);

  componentDidMount() {
    if (this.props.status === StatusPrice.myActive) {
      let newDate = new Date();
      let [needDate, needTime] = this.props.order.need_pay_to
        .split(",")
        .slice(0, 2);

      let needFormat = new Date(
        2000 + Number(needDate.split(".")[2]),
        Number(needDate.split(".")[1]),
        Number(needDate.split(".")[0]),
        Number(needTime.split(":")[0]) +
          Math.abs(newDate.getTimezoneOffset() / 60) -
          3,
        Number(needTime.split(":")[1]),
        Number(needTime.split(":")[2])
      );

      this.setState({ time: showDiff(newDate, needFormat) });
    }
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
              text={this.props.order.exchange_id}
            >
              <p style={{ cursor: "pointer" }}>
                {this.props.order.exchange_id}
              </p>
            </CopyComponent>
            {this.state.copyId ? (
              <span className="copy">Скопировано</span>
            ) : null}
          </td>
          <td>
            {this.props.status === StatusPrice.Active ||
            this.props.status === StatusPrice.myActive ? (
              <>
                <h2>{prettify(this.props.order.rate, 3)}</h2>
                <h2
                  className={this.checkUpdatePercent() > 0 ? "plus" : "minus"}
                >
                  {`${this.checkUpdatePercent()}%`}
                </h2>
              </>
            ) : (
              <>{prettify(this.props.order.rate, 3)}</>
            )}
            {this.props.status === StatusPrice.Canceled ||
            this.props.status === StatusPrice.finished ? (
              <h2>RUB</h2>
            ) : null}
          </td>
          <td>
            {this.props.status === StatusPrice.Active ? (
              <h2>{prettify(Number(this.props.order.requisites), 4, true)}*</h2>
            ) : (
              <CopyComponent
                onCopy={() => {
                  this.setState({ copyRequisites: true });
                  setTimeout(
                    () => this.setState({ copyRequisites: false }),
                    1 * 1000
                  );
                }}
                text={this.props.order.requisites}
              >
                <h2 style={{ cursor: "pointer" }}>
                  {prettify(Number(this.props.order.requisites), 4)}
                </h2>
              </CopyComponent>
            )}
            {this.state.copyRequisites ? (
              <span className="copy">Скопировано</span>
            ) : null}
            <h2>{this.props.order.direction.split("->")[1]}</h2>
          </td>
          <td>
            <h2>{prettify(this.props.order.rub_amount, 3)}</h2>
            <h2>RUB</h2>
          </td>
          <td>
            <CopyComponent
              onCopy={() => {
                this.setState({ copyBTC: true });
                setTimeout(() => this.setState({ copyBTC: false }), 1 * 1000);
              }}
              text={this.props.order.btc_amount}
            >
              <h2 style={{ cursor: "pointer" }}>
                {this.props.order.btc_amount}
              </h2>
            </CopyComponent>
            {this.state.copyBTC ? (
              <span className="copy">Скопировано</span>
            ) : null}
            <h2>BTC</h2>
          </td>
          <td>
            {this.props.status === StatusPrice.myActive ? (
              <>
                <CopyComponent
                  onCopy={() => {
                    this.setState({ copyDate: true });
                    setTimeout(
                      () => this.setState({ copyDate: false }),
                      1 * 1000
                    );
                  }}
                  text={this.props.order.need_pay_to}
                >
                  <h2 style={{ cursor: "pointer" }}>
                    {this.props.order.need_pay_to}
                  </h2>
                </CopyComponent>
                {this.state.copyDate ? (
                  <span className="copy">Скопировано</span>
                ) : null}
                <h2 className={`time ${this.state.time.i < 30 ? "slow" : ""}`}>
                  {this.state.time.i.toString().length < 2 ? "0" : ""}
                  {this.state.time.i}:
                  {this.state.time.s.toString().length < 2 ? "0" : ""}
                  {this.state.time.s}
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
          {this.props.status !== StatusPrice.Canceled &&
          this.props.status !== StatusPrice.finished ? (
            <td>
              {this.props.status === StatusPrice.Active ? (
                <button
                  onClick={() =>
                    this.setAcceptOrder(Number(this.props.order.exchange_id))
                  }
                  className="acceptButton"
                >
                  Принять
                </button>
              ) : this.props.status === StatusPrice.myActive ? (
                <>
                  <button
                    onClick={() =>
                      this.setState({ isMenu: !this.state.isMenu })
                    }
                    className="menuAnswers"
                  >
                    Действие
                  </button>
                </>
              ) : (
                ""
              )}
              {this.state.isMenu ? (
                <div className="menuAnswers">
                  <div>
                    <h2
                      onClick={() => {
                        this.acceptOrder(Number(this.props.order.exchange_id));
                        this.setState({ isMenu: false });
                      }}
                      className="acceptTranButton"
                    >
                      Оплачено
                    </h2>
                  </div>
                  <div>
                    <h2
                      className="cancelTrannButton"
                      onClick={() => {
                        this.cancelAcceptOrder(
                          Number(this.props.order.exchange_id)
                        );
                        this.setState({ isMenu: false });
                      }}
                    >
                      Отменить
                    </h2>
                  </div>
                </div>
              ) : null}
            </td>
          ) : null}
        </tr>
      </>
    );
  }
}
