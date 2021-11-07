import React, { Props, useState } from "react";
import { Modal, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as Speech from "expo-speech";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NominativArticles } from "../../enums/articleEnum";
import { ScrollView, State } from "react-native-gesture-handler";
import Utils from "../../utils/utilFunctions";
import { GenderHelpModal } from "./gender-help-modal/genderHelpModal";
import { ArticleButtons } from "./article-buttons/articleButtons";
import { GrammaticCase as GrammaticCases } from "../../enums/caseEnum";

function ArticlePractice(props: { wordList: Word[] }) {
  const wordList = props.wordList;
  const ON_FIRE_THRESHOLD = 15;
  const UNANSWERED = 0;
  const CORRECT = 1;
  const INCORRECT = 2;

  const initialState = {
    words: Utils.shuffleArray(wordList),
    currentWord: wordList[0],
    currentWordString: wordList[0].word,
    questionStatus: UNANSWERED,
    streak: 0,
    showRejectionColours: false,
    showModal: false,
    activeModalTab: NominativArticles.MASCULINE,
    showEnglishTranslation: false,
    isSpeaking: false,
  };
  const [state, setState] = useState(initialState);

  let view: {
    fadeIn: (arg0: number) => Promise<any>;
    bounceIn: (arg0: number) => Promise<any>;
    shake: (arg0: number) => Promise<any>;
  };

  const onSelectedArticleClick = (article: string) => {
    const nextState = { ...state };

    if (article === state.currentWord.article) {
      const wordAndArticle: string =
        state.currentWord.article + " " + state.currentWord.word;
      nextState.questionStatus = CORRECT;
      bounceWordElement();

      nextState.currentWordString = wordAndArticle;
      if (state.questionStatus === UNANSWERED) {
        nextState.streak = state.streak + 1;
      } else {
        nextState.streak = 0;
      }
      setState(nextState);
    } else {
      shakeWordElement();
    }
  };

  const onNextClick = () => {
    const nextState = { ...state };
    const shuffledWords: Word[] = [...state.words];

    shuffledWords.shift();
    shuffledWords.push(nextState.currentWord);

    nextState.words = shuffledWords;
    nextState.currentWord = shuffledWords[0];
    nextState.currentWordString = shuffledWords[0].word;
    nextState.questionStatus = UNANSWERED;

    fadeInWordElement();

    setState(nextState);
  };

  const elementRef = (ref: any) => (view = ref);

  //TODO: Doesn't work without copying nextState within callback function. Find a better fix.
  const shakeWordElement = () => {
    const nextState = { ...state };
    nextState.showRejectionColours = true;
    nextState.questionStatus = 2;
    nextState.streak = 0;
    setState(nextState);
    view.shake(400).then(() => {
      const nextState_2 = { ...nextState };
      nextState_2.showRejectionColours = false;
      setState(nextState_2);
    });
  };

  const bounceWordElement = () => {
    view.bounceIn(600);
  };

  const fadeInWordElement = () => {
    view.fadeIn(500);
  };

  const toggleModal = (modalState: boolean) => {
    const newState = { ...state };
    newState.showModal = modalState;
    setState(newState);
  };

  const toggleShowTranslation = (translationState: boolean) => {
    const newState = { ...state };
    newState.showEnglishTranslation = translationState;
    setState(newState);
  };

  const toggleSpeakingState = (isSpeaking: boolean) => {
    const newState = { ...state };
    if (isSpeaking) {
      newState.isSpeaking = true;
    } else {
      newState.isSpeaking = false;
    }

    setState(newState);
  };

  const speak = (word: string) => {
    const speechOptions = {
      language: "de-DE",
      onStart: () => toggleSpeakingState(true),
      onDone: () => toggleSpeakingState(false),
    };

    Speech.speak(word, speechOptions);
  };

  // TODO: If the word is too long, it will break over two lines
  // Use responsive font scaling instead to avoid line breaks
  return (
    <View style={styles.container}>
      {state.showModal && <View style={styles.modalOverlay}></View>}

      <View style={styles.innerContainer}>
        <View style={styles.streakContainer}>
          {state.streak > ON_FIRE_THRESHOLD ? (
            <Animatable.Text
              animation={"bounceIn"}
              style={styles.streakTextOnFire}
            >
              Streak:{" " + state.streak}
            </Animatable.Text>
          ) : (
            <Text style={styles.streakText}>Streak:{" " + state.streak}</Text>
          )}
        </View>
        <Animatable.View style={styles.wordContainer} ref={elementRef}>
          <Text style={styles.translationText}>
            {state.questionStatus === CORRECT && "Correct!"}
          </Text>
          <Animatable.Text
            style={
              state.showRejectionColours ? styles.rejectionWord : styles.word
            }
          >
            {state.currentWordString}
          </Animatable.Text>
          {state.showEnglishTranslation && (
            <Animatable.Text style={styles.translationText}>
              {"(" + state.currentWord.englishTranslation + ")"}
            </Animatable.Text>
          )}
          <Pressable
            style={
              state.isSpeaking
                ? styles.textToSpeechButtonPressed
                : styles.textToSpeechButton
            }
            onPress={() => speak(state.currentWordString)}
          >
            <Text>
              <MaterialCommunityIcons
                name={"microphone"}
                size={30}
                color={"grey"}
              ></MaterialCommunityIcons>
            </Text>
          </Pressable>
        </Animatable.View>

        {state.questionStatus === UNANSWERED ||
        state.questionStatus === INCORRECT ? (
          <View style={styles.articleContainer}>
            <ArticleButtons
              onClick={onSelectedArticleClick}
              case={GrammaticCases.NOMINATIV}
            ></ArticleButtons>
          </View>
        ) : (
          <View style={styles.nextContainer}>
            <Button
              key="Next"
              title="Next"
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              containerStyle={styles.buttonContainer}
              onPress={() => onNextClick()}
            ></Button>
          </View>
        )}
        <View style={styles.helpRowContainer}>
          <View style={styles.translationContainer}>
            <Text style={styles.translationToggleLabel}>
              Show English Translation:
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#245448" }}
              thumbColor={state.showEnglishTranslation ? "#47a68d" : "#cfd4d3"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(event) => toggleShowTranslation(event)}
              value={state.showEnglishTranslation}
            />
          </View>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? styles.buttonContainerPressed
                : styles.showModalButtonContainer
            }
            onPress={() => toggleModal(true)}
          >
            <Text style={styles.helpButtonText}>Noun Gender Help</Text>
          </Pressable>
        </View>
        <GenderHelpModal
          showModal={state.showModal}
          onCloseModal={() => toggleModal(false)}
        ></GenderHelpModal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    alignContent: "center",
  },
  innerContainer: {
    width: "90%",
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  header: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#de3333",
  },
  headerText: {
    fontSize: 30,
    color: "#ffffff",
    fontFamily: "Nunito_400Regular",
  },

  articleContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    height: "10%",
  },
  nextContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: "10%",
  },

  helpRowContainer: {
    height: "20%",
    width: "100%",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    // shadowColor: "grey",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: "#cfd4d3",
    // elevation: 4,
    marginBottom: "5%",
  },
  wordContainer: {
    flex: 3,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    fontSize: 40,
    fontFamily: "Nunito_400Regular",
    color: "grey",
  },
  rejectionWord: {
    fontSize: 40,
    fontFamily: "Nunito_400Regular",
    color: "#f07171",
  },

  translationText: {
    fontSize: 18,
    height: "10%",
    fontFamily: "Nunito_400Regular",
    color: "grey",
  },
  showModalButtonContainer: {
    width: "90%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    borderRadius: 10,
    backgroundColor: "#47a68d",
  },
  buttonContainerPressed: {
    width: "90%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    borderRadius: 10,
    backgroundColor: "#245448",
  },
  helpButtonText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Nunito_400Regular",
  },
  textToSpeechButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: "#f7f7f7",
    borderColor: "#cfd4d3",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  textToSpeechButtonPressed: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 3,
    backgroundColor: "#f7f7f7",
    borderColor: "#47a68d",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },

  scrollBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
    borderTopWidth: 1,
    borderTopColor: "#d6d6d6",
  },

  iconStyle: {
    fontSize: 20,
    justifyContent: "center",
    margin: "10%",
  },
  streakContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  streakText: {
    marginTop: 10,
    fontSize: 15,
    color: "grey",
    fontFamily: "Nunito_400Regular",
    // backgroundColor: "#f7f7f7",
    borderColor: "#cfd4d3",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  streakTextOnFire: {
    marginTop: 10,
    fontSize: 15,
    color: "white",
    fontFamily: "Nunito_400Regular",
    // backgroundColor: "#f7f7f7",
    backgroundColor: "#f7c64a",
    padding: 5,
    paddingLeft: 7,
    paddingBottom: 7,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  translationContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    fontFamily: "Nunito_400Regular",
  },
  translationToggleLabel: {
    fontFamily: "Nunito_400Regular",
    color: "grey",
  },
  modalOverlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
  },
  button: {
    padding: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "#f7f7f7",
    width: "100%",
    height: 40,
  },
  buttonContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfd4d3",
    width: "28%",
  },
  buttonText: {
    fontSize: 15,
    color: "grey",
    fontFamily: "Nunito_400Regular",
  },
});

export default ArticlePractice;
