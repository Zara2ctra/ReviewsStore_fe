import {darkThemeColors, lightThemeColors} from "./consts";

export let emptyReview = {
    id: null,
    name: '',
    score: 0,
    rating: 0,
    createdAt: ''
};

export const setUserAuth = async (user, data) => {
    if (data) {
        user.setId(data[0].id);
        user.setUser(user);
        user.setIsAuth(true);
        user.setIsAdmin(data[1] === "ADMIN");
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

export const themeSwitcher = {
    _addDarkTheme() {
        let lightThemeLinkEl = document.querySelector("#light-theme-style");
        if (lightThemeLinkEl) {
            let parentNode = lightThemeLinkEl.parentNode;
            parentNode.removeChild(lightThemeLinkEl);
        }

        let darkThemeLinkEl = document.createElement("link");
        darkThemeLinkEl.setAttribute("rel", "stylesheet");
        darkThemeLinkEl.setAttribute("href", "/themes/soho-dark/theme.css");
        darkThemeLinkEl.setAttribute("id", "dark-theme-style");

        let docHead = document.querySelector("head");
        docHead.append(darkThemeLinkEl);
    },
    _addLightTheme() {
        let darkThemeLinkEl = document.querySelector("#dark-theme-style");
        if (darkThemeLinkEl) {
            let parentNode = darkThemeLinkEl.parentNode;
            parentNode.removeChild(darkThemeLinkEl);
        }

        let lightThemeLinkEl = document.createElement("link");
        lightThemeLinkEl.setAttribute("rel", "stylesheet");
        lightThemeLinkEl.setAttribute("href", "/themes/soho-light/theme.css");
        lightThemeLinkEl.setAttribute("id", "light-theme-style");

        let docHead = document.querySelector("head");
        docHead.append(lightThemeLinkEl);
    },
    darkThemeSwitch(themeMode) {
        if (themeMode === "dark") {
            let darkThemeLinkEl = document.querySelector("#dark-theme-style");
            if (!darkThemeLinkEl) this._addDarkTheme()
        } else {
            let lightThemeLinkEl = document.querySelector("#light-theme-style");
            if (!lightThemeLinkEl) this._addLightTheme()
        }
    }
}