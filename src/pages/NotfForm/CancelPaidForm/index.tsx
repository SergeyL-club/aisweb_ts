import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

interface IStates {
  isCancel: boolean;
  id: string;
}

export default class CancelPaidForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isCancel: false,
      id: "",
    };

    this.cancelPaid = this.cancelPaid.bind(this);
  }

  cancelPaid(data: { id: string }) {
    this.setState({
      id: data.id,
      isCancel: true,
    });
    setTimeout(() => this.setState({ isCancel: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on("cancel paid order", this.cancelPaid);
  }

  componentWillUnmount() {
    this.context.socket.off("cancel paid order", this.cancelPaid);
  }

  render() {
    return (
      <>
        {this.state.isCancel && this.state.id ? (
          <div
            onClick={() => this.setState({ isCancel: false })}
            className="cancelPaidFormNotf"
          >
            <h1>Отмененно {`№${this.state.id}`}</h1>
          </div>
        ) : null}
      </>
    );
  }
}
