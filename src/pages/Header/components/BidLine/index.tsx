import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import { prettify } from "../../../../functions/prettify";
import "./style.sass";

interface IStates {
  isMarquee: boolean;
}

export default class BidLine extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isMarquee: window.innerWidth < 890,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 890) {
        this.setState({ isMarquee: true });
      } else {
        this.setState({ isMarquee: false });
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
      <div className="bidLine">
        {this.state.isMarquee ? (
          <div className="marquee">
            <p>
              {` BTC-RUB: ${prettify(
                this.context.rate,
                3
              )} | Ваша ставка: ${prettify(
                Math.floor(
                  (this.context.rate / 100) * (100 + this.context.percent)
                ),
                3
              )} RUB (${this.context.percent}%)`}
            </p>
          </div>
        ) : (
          <h2>
            {` BTC-RUB: ${prettify(
              this.context.rate,
              3
            )} | Ваша ставка: ${prettify(
              Math.floor(
                (this.context.rate / 100) * (100 + this.context.percent)
              ),
              3
            )} RUB (${this.context.percent}%)`}
          </h2>
        )}
      </div>
    );
  }
}
