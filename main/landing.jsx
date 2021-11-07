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
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import navigationItems from "./landingCards.json";
import { ImageResolver } from "./utils/imageResolver";

function Landing({ navigation }) {
  const imageResolver = new ImageResolver()
  const newState = {
    scrollIndex: 0,
  };
  const [state, setState] = useState(newState);

  const onScrollEnd = (event) => {
    const newState = { ...state };
    newState.scrollIndex =
      event.nativeEvent.contentOffset.x / Dimensions.get("window").width;
    setState(newState);
  };

  const onPressCard = (title) => {
    navigation.navigate(title);
  };

  // Throws error in Typescript file - wtf?
  const getCategories = (card) => {
    return card.map((category, index) => {
      return (
        <Pressable
          key={index}
          style={styles.singleCard}
          onPress={() => onPressCard(category.title)}
        >
          <Text style={styles.cardText}>{category.title}</Text>
      <Image
      key={category.icon}
        style={styles.iconStyle}
        source={imageResolver.getImage(category.icon)}
      />
        </Pressable>
      );
    });
  };

  const getCards = () => {
    return navigationItems.cards.map((card, index) => {
      return (
        <View style={styles.cardRow} key={index}>
          {getCategories(card)}
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
        <View style={styles.backgroundOne}></View>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText1}>Wilkommen.</Text>
          <Text style={styles.welcomeText2}>
            Please select a category to get started. Swipe left for more
            categories.
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

const CARD_WIDTH = Dimensions.get("window").width * 0.9;
const CARD_MARGIN = Dimensions.get("window").width * 0.05;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    paddingTop: "25%",
    position: "relative",
  },
  buttonGroupContainer: {
    display: "flex",
    flexDirection: "column",
    zIndex: 2,
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
    borderRadius: 10,
    backgroundColor: "#47a68d",
    height: "15%",
    width: CARD_WIDTH,
    display: "flex",
    flexDirection: "column",
    padding: 10,
    fontFamily: "Nunito_400Regular",
    zIndex: 2,
  },
  welcomeText1: {
    fontSize: 25,
    color: "white",
    fontFamily: "Nunito_400Regular",
  },
  welcomeText2: {
    fontSize: 15,
    color: "white",
    fontFamily: "Nunito_400Regular",
  },
 
  cardRow: {
    width: CARD_WIDTH,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    height: "60%",
    margin: CARD_MARGIN,
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
  },
  buttonRowPressed: {
    width: CARD_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    margin: CARD_MARGIN,
    backgroundColor: "grey",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    marginBottom: 10,

    backgroundColor: "#cfd4d3",
    borderRadius: 50,
  },
  paginationDotActive: {
    width: 14,
    height: 14,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    marginBottom: 10,
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
  categoryPressed: {
    width: "40%",
    height: "35%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfd4d3",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: "5%",
    backgroundColor: "#cfd4d3",
  },
  buttonTitleStyle: {
    color: "white",
    fontFamily: "Nunito_400Regular",
    fontSize: 15,
  },
  singleCard: {
    width: "40%",
    height: "35%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfd4d3",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: "5%",
  },
  cardText:{
    fontFamily: "Nunito_400Regular",
    color: "grey"
  },
  iconStyle: {
    width: 110,
    height: 110,
    justifyContent: "center", 
    opacity: 0.7,
    borderRadius: 10
  },
  //   backgroundOne: {
  //     width: 900,
  //     height: 800,
  //     borderStyle: "solid",
  //     borderRightWidth: 900,
  //     borderTopWidth: 800,
  //     borderRightColor: "transparent",
  //     borderTopColor: "#f7f7f7",
  //     position: "absolute",
  //     zIndex: 1,
  //   },
});

export default Landing;
