import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Card from "./Card";
import { white, purple } from "../utils/colors";

class QuizView extends Component {
  state = {
    numOfQuestions: 0,
    currentQuestion: 1,
    numOfCorrect: 0,
    showResults: false,
  };

  /**
   * @description Submits the answer
   * @param {boolean} isCorrect - Indicates whether the answer is correct or not
   */
  answerQuestion = (isCorrect) => {
    this.setState((state) => ({
      currentQuestion:
        state.currentQuestion !== state.numOfQuestions
          ? state.currentQuestion + 1
          : state.currentQuestion,
      numOfCorrect: isCorrect ? state.numOfCorrect + 1 : state.numOfCorrect,
      showResults: state.currentQuestion === state.numOfQuestions,
    }));
  };

  /**
   * @description Resets the quiz state and restarts the quiz.
   */
  restart = () => {
    this.setState({
      currentQuestion: 1,
      showResults: false,
      numOfCorrect: 0,
    });
  };

  setTitle = (deckId) => {
    if (!deckId) return;

    this.props.navigation.setOptions({
      title: `Quiz - ${deckId}`,
    });
  };

  componentDidMount() {
    this.setState({
      numOfQuestions: this.props.deck.questions.length,
    });
  }

  render() {
    this.setTitle(this.props.deckId);
    const { questions } = this.props.deck;
    const {
      numOfQuestions,
      currentQuestion,
      showResults,
      numOfCorrect,
    } = this.state;

    if (showResults) {
      return (
        <View style={styles.container}>
          <Text style={[styles.resultHeader, styles.margin]}>
            Quiz Finished
          </Text>
          <Text style={[styles.result, styles.margin]}>
            You have answered {numOfCorrect} out of {numOfQuestions} correct!
          </Text>
          <TouchableOpacity
            onPress={this.restart}
            style={[styles.button, styles.correct]}
          >
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>
          {currentQuestion} / {numOfQuestions}
        </Text>
        {questions
          .filter((question, index) => index + 1 === currentQuestion)
          .map((question, index) => (
            <Card
              question={question.question}
              answer={question.answer}
              key={`question__${index}`}
              onCorrect={() => this.answerQuestion(true)}
              onIncorrect={() => this.answerQuestion(false)}
            />
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    flex: 1,
  },
  resultHeader: {
    alignSelf: "center",
    fontSize: 28,
  },
  result: {
    alignSelf: "center",
    fontSize: 24,
    textAlign: "center",
  },
  margin: {
    marginTop: 24,
    marginBottom: 24,
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    borderRadius: 5,
    marginBottom: 4,
    marginTop: 4,
  },
  buttonText: {
    alignSelf: "center",
    color: white,
    fontSize: 20,
  },
});

export default connect((decks, { route }) => {
  const { deckId } = route.params;

  return {
    deck: decks[deckId],
    deckId,
  };
})(QuizView);
