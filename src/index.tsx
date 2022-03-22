import { render } from "react-dom";
import App from "./App";
import SocketProvider from "./context/socket.context";
import "./index.sass";

render(
  <SocketProvider>
    <App />
  </SocketProvider>,
  document.getElementById("root")
);
