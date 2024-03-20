"use client";
import { FC } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const Providers: FC<Props> = ({ children }): React.ReactNode => {
  return <Provider store={store}> {children} </Provider>;
};

export default Providers;
