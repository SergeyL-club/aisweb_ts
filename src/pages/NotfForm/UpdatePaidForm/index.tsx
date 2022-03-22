import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

interface IStates {
  isUpdate: boolean;
  id: string;
  cost: string;
}

export default class UpdatePaidForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);

    this.state = {
      isUpdate: false,
      id: "",
      cost: "",
    };
    this.updatePaid = this.updatePaid.bind(this);
  }

  updatePaid(data: { id: string; cost: string }) {
    this.setState({
      id: data.id,
      cost: data.cost,
      isUpdate: true,
    });
    setTimeout(() => this.setState({ isUpdate: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on("update paid order", this.updatePaid);
  }

  componentWillUnmount() {
    this.context.socket.off("update paid order", this.updatePaid);
  }

  render() {
    return (
      <>
        {this.state.isUpdate && this.state.id ? (
          <div
            onClick={() => this.setState({ isUpdate: false })}
            className="updatePaidFormNotf"
          >
            <h1>Изменение {`№${this.state.id}`} суммы</h1>
            <h2>Сумма: {`${this.state.cost}`}</h2>
          </div>
        ) : null}
      </>
    );
  }
}
