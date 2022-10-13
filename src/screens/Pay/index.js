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
// ...
export default function Pay() {
  const [visible, setVisible] = useState(0);
  const [load, setLoad] = useState(true);

  const jsCode = `var header = document.getElementById('ctl00_g_72942291_8d59_48cd_a259_dab337fe3d85')
  var breadcrumb = document.querySelector(".breadcrumb")
  var button = document.querySelector(".button")
  var hero = document.querySelector(".hero-description")
  var content = document.querySelector(".content-section")
  var control = document.querySelector(".component-control")
  var footer1 = document.getElementById('MSOZoneCell_WebPartWPQ1')
  var footer2 = document.getElementById('ctl48_g_af60034d_8c6e_4e8d_81ad_a60b7eff4a9c')
  var footer3 = document.getElementById('footer')
   function res(){ 
  
    
    header.style.display ='none'
    breadcrumb.style.display ='none'
    button.style.display ='none'
    hero.style.display ='none'
    content.style.display ='none'
    footer1.style.display ='none'
    footer2.style.display ='none'
    footer3.style.display ='none'
    control.style.display ='none'
  
  
  
  
  }
   res();
  
  
  `;

  function sleep() {
    setTimeout(
      () => setVisible(1),

      2000
    );
  }

  function sleep2() {
    setTimeout(
      () => setLoad(true),

      2000
    );
  }

  sleep();
  sleep2();

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={{ opacity: 0 }}
        injectedJavaScript={jsCode}
        source={{
          uri: "https://loterias.caixa.gov.br/Paginas/default.aspx",
        }}
      />

      <View style={{ alignItems: "center" }}>
        {load ? (
          <ActivityIndicator style={{ marginBottom: "75%" }} size="large" />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
});
