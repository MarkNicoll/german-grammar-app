import React, { useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import navigationItems from "./landingCards.json";

function Landing({ navigation }: any) {
  const newState = {
    scrollIndex: 0,
  };
  const [state, setState] = useState(newState);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newState = { ...state };
    newState.scrollIndex =
      event.nativeEvent.contentOffset.x / Dimensions.get("window").width;
    setState(newState);
  };

  const onPressCard = (title: string) => {
    navigation.navigate(title);
  };

  const getCards = () => {
    return navigationItems.cards.map((card) => {
      return (
        <View style={styles.cardRow} key={card.title}>
          <Text style={styles.cardTitleStyle}>{card.title}</Text>
          <Icon name={card.icon} style={styles.iconStyle} color="#cfd4d3" />
          <Pressable
            style={({ pressed }) =>
              pressed ? styles.buttonContainerPressed : styles.buttonContainer
            }
            onPress={() => onPressCard(card.title)}
          >
            <Text style={styles.buttonTitleStyle}>Start</Text>
          </Pressable>
        </View>
      );
    });
  };

  const getPagination = () => {
    return navigationItems.cards.map((card, index) => {
      return index !== state.scrollIndex ? (
        <View key={index} style={styles.paginationDot}></View>
      ) : (
        <Animatable.View
          key={index}
          animation={"bounceIn"}
          duration={500}
          style={styles.paginationDotActive}
        ></Animatable.View>
      );
    });
  };

  {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText1}>Wilkommen.</Text>
          <Text style={styles.welcomeText2}>
            Select a category to begin practicing noun articles. You can find
            more categories by swiping left.
          </Text>
        </View>
        <View style={styles.paginationDotContainer}>{getPagination()}</View>
        <View style={styles.buttonGroupContainer}>
          <ScrollView
            horizontal={true}
            snapToInterval={Dimensions.get("window").width}
            snapToAlignment={"center"}
            disableIntervalMomentum={true}
            onMomentumScrollEnd={(event) => onScrollEnd(event)}
          >
            {getCards()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const CARD_WIDTH = Dimensions.get("window").width * 0.8;
const CARD_MARGIN = Dimensions.get("window").width * 0.1;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    paddingTop: "25%",
  },
  buttonGroupContainer: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    color: "black",
    backgroundColor: "white",
  },
  cardTitleStyle: {
    color: "grey",
    fontFamily: "Nunito_400Regular",
    fontSize: 20,
  },
  welcomeTextContainer: {
    borderRadius: 20,
    backgroundColor: "#47a68d",
    height: "30%",
    width: CARD_WIDTH,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    fontFamily: "Nunito_400Regular",
  },
  welcomeText1: {
    fontSize: 35,
    color: "white",
    fontFamily: "Nunito_400Regular",
  },
  welcomeText2: {
    fontSize: 15,
    color: "white",
    fontFamily: "Nunito_400Regular",
  },
  iconStyle: {
    fontSize: 160,
    justifyContent: "center",
    margin: "10%",
  },
  cardRow: {
    width: CARD_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    margin: CARD_MARGIN,
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
  },
  buttonRowPressed: {
    width: CARD_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    margin: CARD_MARGIN,
    backgroundColor: "grey",
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
  },
  paginationDotContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 10,
    height: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    backgroundColor: "#cfd4d3",
    borderRadius: 50,
  },
  paginationDotActive: {
    width: 14,
    height: 14,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    backgroundColor: "grey",
    borderRadius: 50,
  },
  buttonContainer: {
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
  buttonTitleStyle: {
    color: "white",
    fontFamily: "Nunito_400Regular",
    fontSize: 15,
  },
});

export default Landing;
