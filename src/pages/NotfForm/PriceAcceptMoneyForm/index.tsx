import React, { Component } from "react";
import { OrderPrice } from "../../../context/interfaces";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

export interface AcceptPaidOrder {
  order: OrderPrice;
  status: "success";
  direction: string;
}

interface IStates {
  isAcceptPrice: boolean;
  acceptPrice: OrderPrice | undefined;
}

export default class PriceAcceptMoneyForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isAcceptPrice: false,
      acceptPrice: undefined,
    };
    this.updateAcceptPrice = this.updateAcceptPrice.bind(this);
  }

  youPercentProfit() {
    if (this.state.acceptPrice) {
      let youBtcRate =
        Math.floor((this.context.rate / 100) * this.context.percent) +
        this.context.rate;
      let rateMinus = youBtcRate - this.state.acceptPrice.rate;
      let rateDivision = rateMinus / this.state.acceptPrice.rate;
      let rateMultiplication = rateDivision * 100;
      let rateRounding = Math.floor(rateMultiplication * 100) / 100;

      return rateRounding;
    }
    return 1;
  }

  updateAcceptPrice(data: AcceptPaidOrder) {
    this.setState({ acceptPrice: data.order, isAcceptPrice: true });
    setTimeout(() => this.setState({ isAcceptPrice: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on(
      "accept translation price order",
      this.updateAcceptPrice
    );
  }

  componentWillUnmount() {
    this.context.socket.off(
      "accept translation price order",
      this.updateAcceptPrice
    );
  }

  render() {
    return (
      <>
        {this.state.isAcceptPrice && this.state.acceptPrice ? (
          <div
            onClick={() => this.setState({ isAcceptPrice: false })}
            className="acceptMoneyFormNotf"
          >
            <h1>Заявка {`${this.state.acceptPrice.exchange_id} принята`}</h1>
            <h2>
              Ставка:{" "}
              <span
                className={this.youPercentProfit() > 0 ? "plus" : "minus"}
              >{`${this.youPercentProfit()}%`}</span>
            </h2>
          </div>
        ) : null}
      </>
    );
  }
}
