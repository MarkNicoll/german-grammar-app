import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { NominativArticles } from "../../enums/articleEnum";
import { ScrollView } from "react-native-gesture-handler";
import { modalStyles } from "./modalStyles";

type Props = {
  showModal: boolean;
  onCloseModal: Function;
};

export const GenderHelpModal = (props: Props) => {
  const { showModal } = props;
  const initialState = {
    activeModalTab: NominativArticles.MASCULINE,
  };
  const [state, setState] = useState(initialState);

  const Strong = (props: any) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );

  const setModalTab = (activeTab: NominativArticles) => {
    const newState = { ...state };
    newState.activeModalTab = activeTab;
    setState(newState);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => props.onCloseModal()}
    >
      <View style={modalStyles.outerModalContainer}>
        <View style={modalStyles.innerModalContainer}>
          <Text style={modalStyles.modalTitle}>Noun Gender Help</Text>
          <View style={modalStyles.modalButtonContainer}>
            <Pressable
              style={
                state.activeModalTab === NominativArticles.MASCULINE
                  ? modalStyles.modalTabButtonActive
                  : modalStyles.modalTabButton
              }
              onPress={() => setModalTab(NominativArticles.MASCULINE)}
            >
              <Text style={modalStyles.modalTabButtonText}>
                {NominativArticles.MASCULINE}
              </Text>
            </Pressable>
            <Pressable
              style={
                state.activeModalTab === NominativArticles.FEMININE
                  ? modalStyles.modalTabButtonActive
                  : modalStyles.modalTabButton
              }
              onPress={() => setModalTab(NominativArticles.FEMININE)}
            >
              <Text style={modalStyles.modalTabButtonText}>
                {NominativArticles.FEMININE}
              </Text>
            </Pressable>
            <Pressable
              style={
                state.activeModalTab === NominativArticles.NEUTER
                  ? modalStyles.modalTabButtonActive
                  : modalStyles.modalTabButton
              }
              onPress={() => setModalTab(NominativArticles.NEUTER)}
            >
              <Text style={modalStyles.modalTabButtonText}>
                {NominativArticles.NEUTER}
              </Text>
            </Pressable>
          </View>
          <ScrollView style={modalStyles.scrollBorder}>
            {state.activeModalTab === NominativArticles.MASCULINE && (
              <View>
                <Text style={modalStyles.modalSubTitle}>Der</Text>
                <Text style={modalStyles.modalText}>
                  Nouns for masculine persons and functions/professions: Vater,
                  Pilot, Arzt;{"\n"}
                  {"\n"}Names of seasons: Frühling, Sommer, Herbst, Winter;
                  Names of months: Januar, Juli, Dezember; Names of days of the
                  week: Montag, Dienstag, Sonntag;
                  {"\n"} {"\n"}Names of compass directions: Nordwest(en),
                  Süd(en); Names of precipitations: Regen, Schnee, Hagel;
                  {"\n"} {"\n"}
                  Names of car brands: Audi, BMW, Mercedes; Names of trains: IC;
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
            {state.activeModalTab === NominativArticles.FEMININE && (
              <View>
                <Text style={modalStyles.modalSubTitle}>Die</Text>
                <Text style={modalStyles.modalText}>
                  Nouns for feminine persons and functions/professions: Mutter,
                  Friseuse, Ärztin;{"\n"} {"\n"}
                  Names of motorcycle brands: Harley Davidson, BMW (only
                  motorcycle), Yamaha;{"\n"} {"\n"}
                  Names of planes and ships: Boeing 747, Titanic;{"\n"} {"\n"}
                  Cardinal numbers: Eins, Drei;{"\n"} {"\n"}
                  <Strong> –falt</Strong>: Vielfalt;{"\n"} {"\n"}
                  <Strong>–heit</Strong>: Freiheit, Sicherheit;{"\n"} {"\n"}
                  <Strong>–keit</Strong>: Möglichkeit, Schnelligkeit;{"\n"}{" "}
                  {"\n"}
                  <Strong>–schaft</Strong>: Freundschaft, Mannschaft;{"\n"}{" "}
                  {"\n"}
                  <Strong>–t (nouns derived from verbs)</Strong>: Fahrt, Tat;
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
                  <Strong>–e</Strong>: Grenze, Lampe; exceptions: der Junge, der
                  Friede;{"\n"} {"\n"}
                  <Strong>–ei</Strong>: Abtei, Metzgerei;{"\n"} {"\n"}
                  exceptions: das Ei, der Papagei;{"\n"} {"\n"}
                  <Strong>–ie</Strong>: Diplomatie, Psychologie;{"\n"} {"\n"}
                  exceptions: der Junkie, der Hippie;{"\n"} {"\n"}
                  <Strong>–in</Strong>: Ärztin, Studentin;{"\n"} {"\n"}
                  exceptions: das Benzin, der Harlekin;{"\n"} {"\n"}
                </Text>
              </View>
            )}
            {state.activeModalTab === NominativArticles.NEUTER && (
              <View>
                <Text style={modalStyles.modalSubTitle}>Das</Text>
                <Text style={modalStyles.modalText}>
                  Diminutives (<Strong>–chen</Strong>, <Strong>–lein</Strong>
                  ): Kaninchen, Fräulein;{"\n"} {"\n"}
                  Nouns derived from infinitives: Essen, Schreiben;{"\n"}
                  {"\n"}
                  Nouns derived from adjectives: Gute, Böse;{"\n"} {"\n"}
                  Names of colors: Rot, Gelb, Blau;{"\n"} {"\n"}
                  <Strong>–ment</Strong>: Instrument, Parlament;{"\n"} {"\n"}
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
                ? modalStyles.buttonContainerPressed
                : modalStyles.closeModalButtonContainer
            }
            onPress={() => props.onCloseModal()}
          >
            <Text style={modalStyles.closeModalButton}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
