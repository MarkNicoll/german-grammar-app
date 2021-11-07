import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import {
  AkkusativArticles,
  DativArticles,
  NominativArticles,
} from "../../enums/articleEnum";
import { GrammaticCase } from "../../enums/caseEnum";
import { Gender } from "../../enums/genderEnum";
import Utils from "../../utils/utilFunctions";
import { buttonStyles } from "./articleButtonsStyles";

type Props = {
  onClick: Function;
  case: GrammaticCase;
};

type Articles = {
  masculine: string;
  feminine: string;
  neuter: string;
};

export const ArticleButtons = (props: Props) => {
  const [articles, setArticles] = useState<Articles>(
    Utils.getArticlesForCase(props.case)
  );

  return (
    <View style={buttonStyles.articleContainer}>
      <Button
        key={articles?.masculine}
        title={articles?.masculine}
        buttonStyle={buttonStyles.button}
        titleStyle={buttonStyles.buttonText}
        containerStyle={buttonStyles.buttonContainer}
        onPress={() => props.onClick(articles.masculine)}
      ></Button>
      <Button
        key={NominativArticles.FEMININE}
        title={NominativArticles.FEMININE}
        buttonStyle={buttonStyles.button}
        titleStyle={buttonStyles.buttonText}
        containerStyle={buttonStyles.buttonContainer}
        onPress={() => props.onClick(articles.feminine)}
      ></Button>
      <Button
        key={NominativArticles.NEUTER}
        title={NominativArticles.NEUTER}
        buttonStyle={buttonStyles.button}
        titleStyle={buttonStyles.buttonText}
        containerStyle={buttonStyles.buttonContainer}
        onPress={() => props.onClick(articles.neuter)}
      ></Button>
    </View>
  );
};
