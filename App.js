import "react-native-gesture-handler";
import React from "react";

import App from "./src";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
export default function Main() {
  return <App />;
}
