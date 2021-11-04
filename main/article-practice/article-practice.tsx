import React, { Props, useState } from "react";
import { Modal, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { QuestionStatus } from "../enums/questionStatusEnum";
import { Article } from "../enums/articleEnum";
import { ScrollView, State } from "react-native-gesture-handler";
import { shuffleArray } from "../utils/utilFunctions";

function ArticlePractice(props: { wordList: Word[] }) {
  const wordList = props.wordList;
  const initialState = {
    words: shuffleArray(wordList),
    currentWord: wordList[0],
    currentWordString: wordList[0].word,
    questionStatus: QuestionStatus.UNANSWERED,
    streak: 0,
    showRejectionColours: false,
    showModal: false,
    activeModalTab: Article.DER,
    showEnglishTranslation: false,
  };
  const [state, setState] = useState(initialState);

  let view: {
    fadeIn: (arg0: number) => Promise<any>;
    bounceIn: (arg0: number) => Promise<any>;
    shake: (arg0: number) => Promise<any>;
  };

  const onclick = (article: string) => {
    const nextState = { ...state };

    if (article === state.currentWord.article) {
      const wordAndArticle: string =
        state.currentWord.article + " " + state.currentWord.word;
      nextState.questionStatus = QuestionStatus.CORRECT;
      bounceWordElement();

      nextState.currentWordString = wordAndArticle;
      if (state.questionStatus === QuestionStatus.UNANSWERED) {
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
    nextState.questionStatus = QuestionStatus.UNANSWERED;

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

  const setModalTab = (activeTab: Article) => {
    const newState = { ...state };
    newState.activeModalTab = activeTab;
    setState(newState);
  };

  const Strong = (props: any) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );

  //TODO: refactor buttons into pressables and move modal into own component
  //TODO: If the word is too long, it will break over two lines. Use responsive font scaling instead to avoid line breaks
  return (
    <View style={styles.container}>
      {state.showModal && <View style={styles.modalOverlay}></View>}

      <View style={styles.innerContainer}>
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>
            Streak:{" " + state.streak}
          </Text>
        </View>
        <Animatable.View style={styles.wordContainer} ref={elementRef}>
          <Text style={styles.messageText}>
            {state.questionStatus === QuestionStatus.CORRECT && "Correct!"}
          </Text>
          <Animatable.Text
            style={
              state.showRejectionColours ? styles.rejectionWord : styles.word
            }
          >
            {state.currentWordString}
          </Animatable.Text>
          <Text style={styles.messageText}>
            {state.showEnglishTranslation &&
              "(" + state.currentWord.englishTranslation + ")"}
          </Text>
        </Animatable.View>
        {state.questionStatus === QuestionStatus.UNANSWERED ||
        state.questionStatus === QuestionStatus.INCORRECT ? (
          <View style={styles.rowContainer}>
            <Button
              key={Article.DER}
              title={Article.DER}
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              containerStyle={styles.buttonContainer}
              onPress={() => onclick(Article.DER)}
            ></Button>
            <Button
              key={Article.DIE}
              title={Article.DIE}
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              containerStyle={styles.buttonContainer}
              onPress={() => onclick(Article.DIE)}
            ></Button>
            <Button
              key={Article.DAS}
              title={Article.DAS}
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              containerStyle={styles.buttonContainer}
              onPress={() => onclick(Article.DAS)}
            ></Button>
          </View>
        ) : (
          <View style={styles.rowContainer}>
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
            <Text>Show English Translation:</Text>
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
            <Text style={styles.helpButtonText}>Noun Gender Rules</Text>
          </Pressable>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={state.showModal}
          onRequestClose={() => {
            toggleModal(false);
          }}
        >
          <View style={styles.outerModalContainer}>
            <View style={styles.innerModalContainer}>
              <Text style={styles.modalTitle}>Noun Gender Rules</Text>
              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={
                    state.activeModalTab === Article.DER
                      ? styles.modalTabButtonActive
                      : styles.modalTabButton
                  }
                  onPress={() => setModalTab(Article.DER)}
                >
                  <Text style={styles.modalTabButtonText}>{Article.DER}</Text>
                </Pressable>
                <Pressable
                  style={
                    state.activeModalTab === Article.DIE
                      ? styles.modalTabButtonActive
                      : styles.modalTabButton
                  }
                  onPress={() => setModalTab(Article.DIE)}
                >
                  <Text style={styles.modalTabButtonText}>{Article.DIE}</Text>
                </Pressable>
                <Pressable
                  style={
                    state.activeModalTab === Article.DAS
                      ? styles.modalTabButtonActive
                      : styles.modalTabButton
                  }
                  onPress={() => setModalTab(Article.DAS)}
                >
                  <Text style={styles.modalTabButtonText}>{Article.DAS}</Text>
                </Pressable>
              </View>
              <ScrollView style={styles.scrollBorder}>
                {state.activeModalTab === Article.DER && (
                  <View>
                    <Text style={styles.modalSubTitle}>Der</Text>
                    <Text style={styles.modalText}>
                      Nouns for masculine persons and functions/professions:
                      Vater, Pilot, Arzt;{"\n"}
                      {"\n"}Names of seasons: Frühling, Sommer, Herbst, Winter;
                      Names of months: Januar, Juli, Dezember; Names of days of
                      the week: Montag, Dienstag, Sonntag;
                      {"\n"} {"\n"}Names of compass directions: Nordwest(en),
                      Süd(en); Names of precipitations: Regen, Schnee, Hagel;
                      {"\n"} {"\n"}
                      Names of car brands: Audi, BMW, Mercedes; Names of trains:
                      IC;
                      {"\n"} {"\n"}
                      Nouns derived from verbs without suffix: Gang, Fang;{"\n"}
                      {"\n"}
                      Alcoholic and plant-based drinks{"\n"} {"\n"}
                      <Strong>–er</Strong> (nouns derived from verbs): Fahrer,
                      Lehrer;
                      {"\n"} {"\n"}
                      <Strong>–ismus</Strong>: Kapitalismus, Journalismus;{"\n"}{" "}
                      {"\n"}
                      <Strong>–ant</Strong>: Demonstrant, Elefant;{"\n"}
                      exceptions: das Croissant, das Restaurant;{"\n"} {"\n"}
                      <Strong>–ling</Strong>: Lehrling, Schützling;{"\n"} {"\n"}
                      exceptions: das Dribbling, das Bowling;{"\n"} {"\n"}
                      <Strong>–ner</Strong>: Rentner, Schaffner, Zöllner;{"\n"}{" "}
                      {"\n"}
                      exceptions: das Banner, die Wiener (Wurst);{"\n"} {"\n"}
                      <Strong>–or</Strong>: Motor, Traktor;{"\n"} {"\n"}
                      exceptions: das Gegentor, das Chlor;{"\n"} {"\n"}
                    </Text>
                  </View>
                )}
                {state.activeModalTab === Article.DIE && (
                  <View>
                    <Text style={styles.modalSubTitle}>Die</Text>
                    <Text style={styles.modalText}>
                      Nouns for feminine persons and functions/professions:
                      Mutter, Friseuse, Ärztin;{"\n"} {"\n"}
                      Names of motorcycle brands: Harley Davidson, BMW (only
                      motorcycle), Yamaha;{"\n"} {"\n"}
                      Names of planes and ships: Boeing 747, Titanic;{"\n"}{" "}
                      {"\n"}
                      Cardinal numbers: Eins, Drei;{"\n"} {"\n"}
                      <Strong> –falt</Strong>: Vielfalt;{"\n"} {"\n"}
                      <Strong>–heit</Strong>: Freiheit, Sicherheit;{"\n"} {"\n"}
                      <Strong>–keit</Strong>: Möglichkeit, Schnelligkeit;{"\n"}{" "}
                      {"\n"}
                      <Strong>–schaft</Strong>: Freundschaft, Mannschaft;{"\n"}{" "}
                      {"\n"}
                      <Strong>–t (nouns derived from verbs)</Strong>: Fahrt,
                      Tat;
                      {"\n"} {"\n"}
                      <Strong>–ung</Strong>: Leitung, Zeitung;{"\n"} {"\n"}
                      <Strong>–ade</Strong>: Hitparade, Marmelade;{"\n"} {"\n"}
                      <Strong>–age</Strong>: Garage, Passage;{"\n"} {"\n"}
                      <Strong>–anz</Strong>: Eleganz, Dominanz;{"\n"} {"\n"}
                      <Strong>–enz</Strong>: Existenz, Tendenz;{"\n"} {"\n"}
                      <Strong>–ik</Strong>: Kritik, Musik;{"\n"} {"\n"}
                      <Strong>–ion</Strong>: Diskussion, Koalition;{"\n"} {"\n"}
                      <Strong> –tät</Strong>: Identität, Qualität;{"\n"} {"\n"}
                      <Strong>–ur</Strong>: Agentur, Reparatur;{"\n"} {"\n"}
                      <Strong>–e</Strong>: Grenze, Lampe; exceptions: der Junge,
                      der Friede;{"\n"} {"\n"}
                      <Strong>–ei</Strong>: Abtei, Metzgerei;{"\n"} {"\n"}
                      exceptions: das Ei, der Papagei;{"\n"} {"\n"}
                      <Strong>–ie</Strong>: Diplomatie, Psychologie;{"\n"}{" "}
                      {"\n"}
                      exceptions: der Junkie, der Hippie;{"\n"} {"\n"}
                      <Strong>–in</Strong>: Ärztin, Studentin;{"\n"} {"\n"}
                      exceptions: das Benzin, der Harlekin;{"\n"} {"\n"}
                    </Text>
                  </View>
                )}
                {state.activeModalTab === Article.DAS && (
                  <View>
                    <Text style={styles.modalSubTitle}>Das</Text>
                    <Text style={styles.modalText}>
                      Diminutives (<Strong>–chen</Strong>,{" "}
                      <Strong>–lein</Strong>
                      ): Kaninchen, Fräulein;{"\n"} {"\n"}
                      Nouns derived from infinitives: Essen, Schreiben;{"\n"}
                      {"\n"}
                      Nouns derived from adjectives: Gute, Böse;{"\n"} {"\n"}
                      Names of colors: Rot, Gelb, Blau;{"\n"} {"\n"}
                      <Strong>–ment</Strong>: Instrument, Parlament;{"\n"}{" "}
                      {"\n"}
                      exceptions: der Konsument, der Zement;{"\n"} {"\n"}
                      <Strong>–nis</Strong>: Ergebnis, Tennis;{"\n"} {"\n"}
                      exceptions: die Fahrerlaubnis, die Wildnis;{"\n"} {"\n"}
                      <Strong>–o</Strong>: Auto, Konto;{"\n"} {"\n"}
                      exceptions: die Avocado, der Euro;{"\n"} {"\n"}
                      <Strong>–tum</Strong>: Quantum, Ultimatum;{"\n"} {"\n"}
                      exceptions: der Reichtum, der Irrtum;{"\n"} {"\n"}
                      <Strong>–um</Strong> (nouns of Latin origin): Publikum,
                      Museum, Stadium;{"\n"} {"\n"}
                    </Text>
                  </View>
                )}
              </ScrollView>
              <Pressable
                style={({ pressed }) =>
                  pressed
                    ? styles.buttonContainerPressed
                    : styles.closeModalButtonContainer
                }
                onPress={() => {
                  toggleModal(false);
                }}
              >
                <Text style={styles.closeModalButton}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  button: {
    padding: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "#f7f7f7",
    width: "100%",
    height: 40,
    fontSize: 20,
  },
  buttonContainer: {
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: "#cfd4d3",
    elevation: 2,
    width: "28%",
  },
  buttonText: {
    fontSize: 15,
    color: "grey",
    fontFamily: "Nunito_400Regular",
  },
  rowContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
  },
  modalButtonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modalTabButton: {
    margin: 5,
    flex: 1,
    padding: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d6d6d6",
    backgroundColor: "white",
    height: 30,
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modalTabButtonActive: {
    margin: 5,
    flex: 1,
    padding: 1,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#47a68d",
    backgroundColor: "white",
    height: 30,
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modalTabButtonText: {
    color: "grey",
    fontSize: 15,
  },
  closeModalButtonContainer: {
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
    marginTop: 10,
  },
  helpRowContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: "#cfd4d3",
    elevation: 4,
    paddingBottom: 25,
    marginBottom: "15%",
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

  messageText: {
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

  outerModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerModalContainer: {
    height: "98%",
    width: "98%",
    padding: "5%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#d6d6d6",
  },
  modalTitle: {
    fontSize: 15,
    color: "grey",
    marginBottom: 10,
  },
  modalSubTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    marginTop: 10,
    marginBottom: 10,
  },
  modalText: {
    flex: 1,
    fontSize: 15,
    color: "grey",
  },
  scrollBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
    borderTopWidth: 1,
    borderTopColor: "#d6d6d6",
  },
  modalOverlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
  },
  closeModalButton: {
    color: "white",
    fontSize: 15,
    fontFamily: "Nunito_400Regular",
  },
  iconStyle: {
    fontSize: 20,
    justifyContent: "center",
    margin: "10%",
  },
  streakContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  streakText: {
    marginTop: 10,
    fontSize: 15,
    color: "grey",
    fontFamily: "Nunito_400Regular",
  },
  translationContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
  },
});

export default ArticlePractice;
