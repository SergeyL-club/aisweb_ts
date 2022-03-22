import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import Row from "./Row";
import "./style.sass";

export default class Table extends Component {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  render() {
    return (
      <table className="historyTable">
        <thead>
          <tr>
            <th>Операция</th>
            <th>Описание</th>
            <th>Сумма</th>
            <th>Баланс до</th>
            <th>Баланс после</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {this.context.historyArray && this.context.historyArray.logs ? (
            this.context.historyArray.logs.map((log, key) => {
              return <Row log={log} key={key} />;
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
