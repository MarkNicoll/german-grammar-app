import { StyleSheet } from "react-native";


export const buttonStyles = StyleSheet.create({
    articleContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        height: "10%",
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
})