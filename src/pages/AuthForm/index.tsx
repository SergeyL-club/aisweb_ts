import React, { Component, createRef } from "react";
import { SocketContext } from "../../context/socket.context";
import "./style.sass";

export default class AuthForm extends Component {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  tokenRef: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.tokenRef = createRef<HTMLInputElement>();
    this.auth = this.auth.bind(this);
  }

  auth() {
    if (this.tokenRef.current) {
      this.context.socket.emit("auth", {
        token: this.tokenRef.current.value.trim(),
      });
    }
  }

  render() {
    return (
      <div className="authForm">
        <h1>Авторизация</h1>
        <input
          type="password"
          name="token"
          id="token"
          ref={this.tokenRef}
          placeholder="Введите токен"
        />
        <div>
          <label htmlFor="saveMe">Запомнить меня</label>
          <input
            type="checkbox"
            name="saveMe"
            defaultChecked={this.context.isSave}
            onClick={() => this.context.setIsSave(!this.context.isSave)}
            id="saveMe"
          />
        </div>
        <button onClick={this.auth} id="authButton">
          Войти
        </button>
      </div>
    );
  }
}
