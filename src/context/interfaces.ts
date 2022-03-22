import { Socket } from "socket.io-client";

export interface AccountInfo {
  balance: string;
  balance_fiat: string;
  balance_today: string;
  balance_today_fiat: string;
  closed_orders: string;
  closed_orders_today: string;
  deal_enable: boolean;
  direction: string;
  escrow_now_btc: string;
  escrow_now_rub: string;
  is_seller: boolean;
  max_limit: number;
  min_limit: number;
  notifications: number;
  percent: number;
  received_fiat: string;
  received_fiat_today: string;
  alias: string | undefined;
  depositToken: string | undefined;
}

export interface ResAccountInfo {
  balance: string;
  balance_fiat: string;
  balance_today: string;
  balance_today_fiat: string;
  closed_orders: string;
  closed_orders_today: string;
  deal_enable: boolean;
  direction: string;
  escrow_now_btc: string;
  escrow_now_rub: string;
  is_seller: boolean;
  max_limit: number;
  min_limit: number;
  notifications: number;
  percent: number;
  received_fiat: string;
  received_fiat_today: string;
}

export interface IState {
  isAuth: boolean;
  isSave: boolean;
  isLoad: boolean;
  accountInfo: AccountInfo | undefined;
  nav: string;
  rate: number;
  percent: number;
  saleArray: SaleArray | undefined;
  priceArray: PriceArray | undefined;
  saleNotf: SaleNA | SaleNC | undefined;
  historyArray: HistoryArray | undefined;
  walletArray: WalletArray | undefined;
  priceNotf: PriceNA | PriceNMA | undefined;
}

export interface PriceNA {
  status: "Active";
  number: number;
}

export interface SaleNA {
  status: "active";
  number: number;
}
export interface SaleNC {
  status: "checking";
  number: number;
}

export interface PriceNMA {
  status: "myActive";
  number: number;
}

export interface ISocketContext {
  socket: Socket;
  isAuth: boolean;
  nav: string;
  accountInfo: AccountInfo | undefined;
  priceNotf: PriceNA | PriceNMA | undefined;
  setNav: (status: string) => void;
  isLoad: boolean;
  historyArray: HistoryArray | undefined;
  saleArrays: SaleArray | undefined;
  priceArrays: PriceArray | undefined;
  setIsAuth: (bol: boolean) => void;
  saleNotf: SaleNA | SaleNC | undefined;
  isSave: boolean;
  setIsSave: (bol: boolean) => void;
  rate: number;
  walletArray: WalletArray | undefined;
  percent: number;
}

export enum StatusNav {
  price = "price",
  sale = "sale",
  wallets = "wallets",
  history = "history",
}

export interface OrderSale {
  id: string;
  fiat_amount: string;
  old_amount: string;
  btc_amount: string;
  status: string;
  curse: number;
  time_window: string;
  created_at: string;
  fromreq: null | any;
  awaiting_check: boolean;
  wallet_description: string;
  percent: number;
  requisities: string;
}

export interface OrderPrice {
  bonus_fiat: number;
  boost_order: boolean;
  btc_amount: string;
  canceled_amount: number;
  created_at: string;
  direction: string;
  exchange_id: string;
  expired_at: string;
  need_pay_to: string;
  rate: number;
  requisites: string;
  rub_amount: number;
  status: string;
}

export interface SaleArray {
  maxPage: number;
  page: number;
  orders: Array<OrderSale> | undefined;
}
export interface PriceArray {
  maxPage: number;
  page: number;
  orders: Array<OrderPrice> | undefined;
}

export interface HistoryArray {
  maxPage: number;
  page: number;
  logs: Array<Log> | undefined;
}

export interface WalletArray {
  maxPage: number;
  page: number;
  wallets: Array<Wallet> | undefined;
}

export interface Wallet {
  id: number;
  number: string;
  enable: boolean;
  autonumber_off: boolean;
  notify_off: boolean;
  description: string;
  quantity_limit: boolean;
  quantity_limit_amount: number;
  limit: number;
  banned: boolean;
  info: {
    id: number;
    sum_escrow: number;
    sum_all: number;
    sum_finished: number;
    order_count_today: number;
  };
}

export interface Log {
  id: string;
  order: { id: number; rub_amount: number } | null;
  operation: string;
  amount: string;
  info: string;
  balance_before: string;
  balance_after: string;
  created_at: string;
}
