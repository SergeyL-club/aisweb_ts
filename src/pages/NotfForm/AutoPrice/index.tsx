import React, { Component } from "react";
import { OrderPrice } from "../../../context/interfaces";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

export interface AcceptSetUserExcOrder {
  direction: string;
  order: OrderPrice;
  status: "success";
}

interface IStates {
  isAutoPrice: boolean;
  autoPrice: OrderPrice | undefined;
}

export default class AutoPriceForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isAutoPrice: false,
      autoPrice: undefined,
    };
    this.updateAcceptPrice = this.updateAcceptPrice.bind(this);
  }

  youPercentProfit() {
    if (this.state.autoPrice) {
      let youBtcRate =
        Math.floor((this.context.rate / 100) * this.context.percent) +
        this.context.rate;
      let rateMinus = youBtcRate - this.state.autoPrice.rate;
      let rateDivision = rateMinus / this.state.autoPrice.rate;
      let rateMultiplication = rateDivision * 100;
      let rateRounding = Math.floor(rateMultiplication * 100) / 100;

      return rateRounding;
    }
    return 1;
  }

  updateAcceptPrice(data: AcceptSetUserExcOrder) {
    this.setState({ autoPrice: data.order, isAutoPrice: true });
    setTimeout(() => this.setState({ isAutoPrice: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on("autoPaid", this.updateAcceptPrice);
  }

  componentWillUnmount() {
    this.context.socket.off("autoPaid", this.updateAcceptPrice);
  }

  render() {
    return (
      <>
        {this.state.isAutoPrice && this.state.autoPrice ? (
          <div
            onClick={() => this.setState({ isAutoPrice: false })}
            className="autoPriceFormNotf"
          >
            <h1>Заявка {`${this.state.autoPrice.exchange_id} принята`}</h1>
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
