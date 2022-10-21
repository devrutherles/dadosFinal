import React, { Component, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { HStack, Spinner } from "native-base";

export default function Chat() {
  const jsCode = `var content = document.querySelector(".cc-15lb")
    var control = document.querySelector(".component-control")

     function res(){ 
    
      
      content.style.display ='none !important'
      breadcrumb.style.display ='none'

    
    
    
    
    }
     res();
    
    
    `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        injectedJavaScript={jsCode}
        source={{
          uri: "https://orvalhosj.com/caipira/pages/chat.php",
        }}
      />
    </SafeAreaView>
  );
}
