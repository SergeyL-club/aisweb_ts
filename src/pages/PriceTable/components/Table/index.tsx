import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import { StatusPrice } from "../Filter";
import Row from "./Row";
import "./style.sass";

interface IStates {
  status: string;
}

export default class Table extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      status: StatusPrice.Active,
    };
    this.update = this.update.bind(this);
  }

  update(filter: string) {
    this.setState({ status: filter });
  }

  componentDidMount() {
    this.context.socket.on("set filter price", this.update);
  }
  componentWillUnmount() {
    this.context.socket.off("set filter price", this.update);
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <table className="priceTable">
        <thead>
          <tr>
            <th>Статус</th>
            <th>ID</th>
            <th>Курс</th>
            <th>Реквизиты</th>
            <th>Отправляем</th>
            <th>Получаем</th>
            <th>Дата</th>
            {this.state.status === StatusPrice.Active ||
            this.state.status === StatusPrice.myActive ? (
              <th>Действие</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {this.context.priceArrays && this.context.priceArrays.orders ? (
            this.context.priceArrays.orders.map((order, key) => {
              return <Row status={this.state.status} key={key} order={order} />;
            })
          ) : (
            <tr>
              <td style={{ position: "relative" }}>
                <img className="load" src="/loading.gif" alt="Table" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
