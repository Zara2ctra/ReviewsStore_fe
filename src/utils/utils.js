import {darkThemeColors, lightThemeColors} from "./consts";

export const setUserAuth = (user, data) => {
    if (data) {
        user.setId(data.id);
        user.setUser(user);
        user.setIsAuth(true);
    } else {
        user.setId(null);
        user.setUser(null);
        user.setIsAuth(false);
    }
};

export const setBodyBackgroundColor = (themeMode) => {
    document.body.style.backgroundColor =
        themeMode === "dark" ? darkThemeColors.background : lightThemeColors.background;
};