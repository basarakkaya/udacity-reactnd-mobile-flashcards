import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome } from "@expo/vector-icons";
import DecksList from "../DecksList";
import NewDeck from "../NewDeck";
import { purple, white } from "../../utils/colors";

// Config for TabNav
const RouteConfigs = {
  Decks: {
    name: "Decks",
    component: DecksList,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="layer-group" size={30} color={tintColor} />
      ),
      title: "Decks",
    },
  },
  NewDeck: {
    name: "New Deck",
    component: NewDeck,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      ),
      title: "New Deck",
    },
  },
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator {...TabNavigatorConfig}>
      <Tab.Screen {...RouteConfigs["Decks"]} />
      <Tab.Screen {...RouteConfigs["NewDeck"]} />
    </Tab.Navigator>
  );
}
