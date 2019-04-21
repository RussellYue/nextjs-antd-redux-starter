import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import { makeStore } from "../store";

class myApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { store } = ctx;

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { store, pageProps };
  }

  render() {
    const { store, Component, pageProps } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(makeStore)(myApp);
