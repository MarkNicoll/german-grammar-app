import { AkkusativArticles, DativArticles, NominativArticles } from "../enums/articleEnum";
import { GrammaticCase } from "../enums/caseEnum";


export default class Utils {

    static shuffleArray = (array: Array<any>) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    
        return array
    }

    static getArticlesForCase = (grammaticCase: GrammaticCase) => {
        switch(grammaticCase){
            case GrammaticCase.NOMINATIV:
                return getNomativeAritcles()
            case GrammaticCase.AKKUSATIV:
                return getAkkusativAritcles()
            case GrammaticCase.DATIV:
                return getDativAritcles()
            default:
                return getNomativeAritcles()
        }
    }

}

const getNomativeAritcles = () => {
    return {
        masculine: NominativArticles.MASCULINE, 
        feminine: NominativArticles.FEMININE,
        neuter: NominativArticles.NEUTER
    }
}

const getAkkusativAritcles = () => {
    return {
        masculine: AkkusativArticles.MASCULINE, 
        feminine: AkkusativArticles.FEMININE,
        neuter: AkkusativArticles.NEUTER
    }
}

const getDativAritcles = () => {
    return {
        masculine: DativArticles.MASCULINE, 
        feminine: DativArticles.FEMININE,
        neuter: DativArticles.NEUTER
    }
}

