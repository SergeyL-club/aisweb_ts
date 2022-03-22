import React, { Component } from "react";
import { SocketContext } from "../../context/socket.context";
import "./style.sass";

interface IProps {
  preInput: string;
  close: () => void;
  id: string;
}

interface Istates {
  preInput: string;
}

export default class UpdatePriceForm extends Component<IProps, Istates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      preInput: props.preInput,
    };
  }

  checkingNumber(el: React.ChangeEvent<HTMLInputElement>) {
    let value = el.currentTarget.value;

    if (value.trim() === "") {
      this.setState({ preInput: "0" });
      el.currentTarget.value = "0";
    } else if (
      /[0-9]/.test(value[value.length - 1]) &&
      value[0] === "0" &&
      value.length === 2
    ) {
      this.setState({ preInput: value[value.length - 1] });
      el.currentTarget.value = value[value.length - 1];
    } else if (!isNaN(Number(value))) {
      this.setState({ preInput: value });
      el.currentTarget.value = value;
    } else {
      el.currentTarget.value = this.state.preInput;
    }
  }

  send() {
    this.context.socket.emit("update paid order", {
      id: this.props.id,
      cost: this.state.preInput,
    });
    this.props.close();
  }

  render() {
    return (
      <>
        <div onClick={() => this.props.close()} className="background"></div>
        <div className="updateSaleForm">
          <h1>{`Изменение стоимости заявки №${this.props.id}`}</h1>
          <input
            defaultValue={this.props.preInput}
            onChange={(el) => this.checkingNumber(el)}
            type="text"
            id="cost"
          />
          <div className="buttons">
            <button onClick={() => this.props.close()}>Отмена</button>
            <button onClick={() => this.send()}>Принять</button>
          </div>
        </div>
      </>
    );
  }
}
