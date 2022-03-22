import React, { Component } from "react";
import AcceptPaidForm from "./AcceptPaidForm";
import AddWalletForm from "./AddWalletForm";
import AutoPriceForm from "./AutoPrice";
import CancelPaidForm from "./CancelPaidForm";
import DeleteWalletForm from "./DeleteWalletForm";
import EditWalletForm from "./editWalletForm";
import PriceAcceptForm from "./PriceAcceptForm";
import PriceAcceptMoneyForm from "./PriceAcceptMoneyForm";
import PriceCancelForm from "./PriceCancelForm";
import RefreshWalletForm from "./RefreshWalletForm";
import "./style.sass";
import ToggleWaletForm from "./ToggleWalletForm";
import UpdatePaidForm from "./UpdatePaidForm";

export default class NotfForm extends Component {
  render() {
    return (
      <>
        <PriceAcceptForm />
        <PriceCancelForm />
        <PriceAcceptMoneyForm />
        <AutoPriceForm />
        <ToggleWaletForm />
        <AddWalletForm />
        <EditWalletForm />
        <DeleteWalletForm />
        <AcceptPaidForm />
        <UpdatePaidForm />
        <CancelPaidForm />
        <RefreshWalletForm />
      </>
    );
  }
}
