import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./main/landing";
import ArticlePractice from "./main/article-practice/article-practice";
import wordList from "./main/nouns.json";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  const Stack = createStackNavigator();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyle: { backgroundColor: "#ffffff" },
            }}
          >
            <Stack.Screen
              options={{
                headerTitleStyle: {
                  color: "#ffffff",
                  fontWeight: "bold",
                  display: "none",
                },
                headerStyle: { backgroundColor: "#ffffff", height: 0 },
              }}
              name="Landing"
              component={Landing}
            />
            <Stack.Screen
              options={{
                headerTitleStyle: {
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Nunito_400Regular",
                },
                headerStyle: { backgroundColor: "#47a68d" },
                headerTintColor: "#ffffff",
              }}
              name="Food and Drink"
            >
              {(props) => (
                <ArticlePractice
                  {...props}
                  wordList={wordList.nouns.foodAndDrink}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              options={{
                headerTitleStyle: {
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Nunito_400Regular",
                },
                headerStyle: { backgroundColor: "#47a68d" },
                headerTintColor: "#ffffff",
              }}
              name="Technology"
            >
              {(props) => (
                <ArticlePractice
                  {...props}
                  wordList={wordList.nouns.technology}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              options={{
                headerTitleStyle: {
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Nunito_400Regular",
                },
                headerStyle: { backgroundColor: "#47a68d" },
                headerTintColor: "#ffffff",
              }}
              name="Household Items"
            >
              {(props) => (
                <ArticlePractice
                  {...props}
                  wordList={wordList.nouns.household}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              options={{
                headerTitleStyle: {
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Nunito_400Regular",
                },
                headerStyle: { backgroundColor: "#47a68d" },
                headerTintColor: "#ffffff",
              }}
              name="Workplace"
            >
              {(props) => (
                <ArticlePractice
                  {...props}
                  wordList={wordList.nouns.workplace}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              options={{
                headerTitleStyle: {
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Nunito_400Regular",
                },
                headerStyle: { backgroundColor: "#47a68d" },
                headerTintColor: "#ffffff",
              }}
              name="Social"
            >
              {(props) => (
                <ArticlePractice
                  {...props}
                  wordList={wordList.nouns.social}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
