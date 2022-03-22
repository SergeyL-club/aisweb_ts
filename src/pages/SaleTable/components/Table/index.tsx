import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import { StatusPrice } from "../../../PriceTable/components/Filter";
import UpdatePriceForm from "../../../UpdateSaleForm";
import { StatusSell } from "../Filter";
import Row from "./Row";
import "./style.sass";

export const StatusOrder: any = {
  Verified: "Новая",
  Paid: "Обрабатывается",
  Finished: "Завершена",
  Autocanceled: "Просрочена",
  Canceled: "Отменена",
  "In dispute": "На рассмотрении",
  Verification: "Новая",
  "Seller requisite": "Ожидает оплаты",
  "On checking": "На проверке",
  Recalculation: "Новая",
};

interface IStates {
  status: string;
  preInput: string;
  preId: string;
  isUpdate: boolean;
}
export default class Table extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      status: StatusPrice.Active,
      preInput: "",
      preId: "",
      isUpdate: false,
    };
    this.update = this.update.bind(this);
    this.updateSale = this.updateSale.bind(this);
    this.openUpdate = this.openUpdate.bind(this);
    this.closeUpdate = this.closeUpdate.bind(this);
  }

  update(filter: string) {
    this.setState({ status: filter });
  }

  updateSale(preInput: string, preId: string) {
    this.setState({ preInput, preId });
  }

  openUpdate() {
    this.setState({ isUpdate: true });
  }

  closeUpdate() {
    this.setState({ isUpdate: false });
  }
  componentDidMount() {
    this.context.socket.on("set filter sale", this.update);
  }
  componentWillUnmount() {
    this.context.socket.off("set filter sale", this.update);
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <>
        {this.state.isUpdate ? (
          <UpdatePriceForm
            close={this.closeUpdate}
            id={this.state.preId}
            preInput={this.state.preInput}
          />
        ) : null}
        <table className="saleTable">
          <thead>
            <tr>
              <th>Статус</th>
              <th>ID</th>
              <th>Реквизиты</th>
              <th>Отправляем</th>
              <th>Получаем</th>
              <th>Дата</th>
              {this.state.status !== StatusSell.finished ? (
                <th>Действие</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {this.context.saleArrays && this.context.saleArrays.orders ? (
              this.context.saleArrays.orders.map((order, key) => {
                return (
                  <Row
                    updateSale={this.updateSale}
                    openUpdate={this.openUpdate}
                    status={this.state.status}
                    key={key}
                    order={order}
                  />
                );
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
      </>
    );
  }
}
