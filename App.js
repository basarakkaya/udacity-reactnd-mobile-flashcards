import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./redux/reducers";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { purple } from "./utils/colors";
import MainNav from "./components/navigation/MainNav";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { setLocalNotification } from "./utils/helpers";

function StatusBarCustom({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducer, applyMiddleware(thunk, logger));
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBarCustom backgroundColor={purple} barStyle="light-content" />
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
