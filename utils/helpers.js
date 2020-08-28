import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

const NOTIFICATION_KEY = "MobileFlashcards:Notifications";

/**
 * @description Returns a formatted card with given arguments
 * @param {string} question - Question of the card
 * @param {string} answer - Answer of the card
 */
export function formatCard(question, answer) {
  return {
    question,
    answer,
  };
}

/**
 * @description Returns a formatted deck with given deck title
 * @param {string} title - Title of the deck
 */
export function formatDeck(title) {
  return {
    [title]: {
      title,
      questions: [],
    },
  };
}

/**
 * @description Clears the scheduled local notifications set by this app
 */
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

/**
 * @description Creates a local notification content configuration object
 */
function createNotification() {
  return {
    title: "Take a Quiz!",
    body: "Don't forget to train on your decks and take quizzes!",
    ios: { sound: true },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

/**
 * @description Sets a scheduled local notification
 */
export function setLocalNotification() {
  debugger;
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      console.log("getdata: ", data);
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          console.log("status", status);
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
