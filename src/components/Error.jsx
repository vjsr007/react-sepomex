import React, { Component } from "react";
import { openSnackbar } from "./Notifier";

export default class ErrorBoundary extends Component {
  state = { hasError: false, message: "" };

  componentDidCatch(error, info) {
    this.setState({ hasError: false, message: error });
  }

  render() {
    if (this.state.hasError) {
      return <div>{openSnackbar({ message: this.state.message })}</div>;
    }
    return this.props.children;
  }
}
