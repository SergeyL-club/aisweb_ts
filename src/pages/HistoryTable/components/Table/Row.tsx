import React, { Component } from "react";
import { Log } from "../../../../context/interfaces";

interface IProps {
  log: Log;
}

export default class Row extends Component<IProps, any> {
  render() {
    return (
      <>
        <tr>
          <td className={this.props.log.operation.toLowerCase()}>
            {this.props.log.operation === "plus" ? "Увеличение" : "Уменьшение"}
          </td>
          <td>
            {this.props.log.info.indexOf("бонус") !== -1 ||
            this.props.log.info.indexOf("Внутр") !== -1 ? (
              "Системный перевод"
            ) : (
              <>
                {this.props.log.info}{" "}
                {this.props.log.order ? "#" + this.props.log.order.id : ""}{" "}
                {this.props.log.order
                  ? ` (${this.props.log.order.rub_amount} RUB)`
                  : ""}
              </>
            )}
          </td>
          <td>
            <h2>{this.props.log.amount}</h2>
            <h2>BTC</h2>
          </td>
          <td>
            <h2>{this.props.log.balance_before}</h2>
            <h2>BTC</h2>
          </td>
          <td>
            <h2>{this.props.log.balance_after}</h2>
            <h2>BTC</h2>
          </td>
          <td>{this.props.log.created_at}</td>
        </tr>
      </>
    );
  }
}
