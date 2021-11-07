const foodAndDrinkIcon = require('../../assets/Food-and-Drink.png')
const householdIcon = require('../../assets/Household.png')
const sportIcon = require('../../assets/Sport.png')
const geographyIcon = require('../../assets/Geography.png')
const socialIcon = require('../../assets/Social.png')
const technologyIcon = require('../../assets/Technology.png')
const workplaceIcon = require('../../assets/Workplace.png')
const educationIcon = require('../../assets/Education.png')
const cultureIcon = require('../../assets/Culture.png')
const allIcon = require('../../assets/All.png')
 
export class ImageResolver {
    getImage = (key: string) => {
        console.log(key)
        switch(key){
            case "Food-and-Drink":
                return foodAndDrinkIcon
            case "Sport":
                return sportIcon
            case "Household":
                return householdIcon
            case "Geography":
                return geographyIcon
            case "Social":
                return socialIcon
            case "Workplace":
                return workplaceIcon
            case "Education":
                return educationIcon
            case "Culture":
                return cultureIcon
            case "Technology":
                return technologyIcon  
            case "All":
                return allIcon
            default:
            break
        }
    }
}
