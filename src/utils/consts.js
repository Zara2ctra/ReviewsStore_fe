import {faker} from "@faker-js/faker"

export const MAIN_ROUTE = "/";
export const ADMIN_ROUTE = "/admin";
export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";
export const REVIEWS_STORE_ROUTE = "/type";
export const REVIEW_ROUTE = "/review";
export const REVIEW_CREATE_ROUTE = "/add"
export const REVIEW_ROUTE_EDIT = "/review_edit"
export const USER_PROFILE_ROUTE = "/user";

export const TYPES_EN = ["ANIME", "GAME", "BOOK", "MOVIE", "SERIES", "CARTOON", "OTHERS"]

export const lightThemeColors = {
    background: "#eeeeee",
    text: "black",
};

export const darkThemeColors = {
    background: "#043B3B",
    text: "white",
};

export const blankMarkDown = `
${faker.word.words(5)}
=======
![](${faker.image.cats()})
-----------

# ${faker.word.words(5)}

## ${faker.word.words(5)}

${faker.word.words(3)}
${faker.word.words(2)}.

${faker.word.words(7)} 
${faker.word.words(4)}
`