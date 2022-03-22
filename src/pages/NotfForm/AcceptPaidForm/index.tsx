import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

interface IStates {
  isAccept: boolean;
  id: string;
}

export default class AcceptPaidForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isAccept: false,
      id: "",
    };

    this.acceptPaid = this.acceptPaid.bind(this);
  }

  acceptPaid(data: { id: string }) {
    this.setState({
      id: data.id,
      isAccept: true,
    });
    setTimeout(() => this.setState({ isAccept: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on("accept paid order", this.acceptPaid);
  }

  componentWillUnmount() {
    this.context.socket.off("accept paid order", this.acceptPaid);
  }

  render() {
    return (
      <>
        {this.state.isAccept && this.state.id ? (
          <div
            onClick={() => this.setState({ isAccept: false })}
            className="acceptPaidFormNotf"
          >
            <h1>Успешно {`№${this.state.id}`}</h1>
          </div>
        ) : null}
      </>
    );
  }
}
