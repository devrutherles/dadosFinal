import "react-native-gesture-handler";
import React from "react";
import AuthProvider from "./src/screens/hooks/auth";
import App from "./src";

export default function Main() {
  return (
    <AuthProvider>
    <App/>
    </AuthProvider>

  )
 
}
