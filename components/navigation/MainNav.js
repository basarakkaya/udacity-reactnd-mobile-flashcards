import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNav from "./TabNav";
import DeckView from "../DeckView";
import QuizView from "../QuizView";
import NewCard from "../NewCard";
import { purple, white } from "../../utils/colors";

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: "screen",
};
const StackConfig = {
  TabNav: {
    name: "Home",
    component: TabNav,
    options: { headerShown: false },
  },
  DeckView: {
    name: "DeckView",
    component: DeckView,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: "Deck View",
    },
  },
  QuizView: {
    name: "QuizView",
    component: QuizView,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: "Quiz View",
    },
  },
  NewCard: {
    name: "NewCard",
    component: NewCard,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: "New Card",
    },
  },
};

const Stack = createStackNavigator();

export default function MainNav() {
  return (
    <Stack.Navigator {...StackNavigatorConfig}>
      <Stack.Screen {...StackConfig["TabNav"]} />
      <Stack.Screen {...StackConfig["DeckView"]} />
      <Stack.Screen {...StackConfig["QuizView"]} />
      <Stack.Screen {...StackConfig["NewCard"]} />
    </Stack.Navigator>
  );
}
