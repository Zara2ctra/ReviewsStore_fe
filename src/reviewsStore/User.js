import {makeAutoObservable} from "mobx";
import {darkThemeColors, lightThemeColors} from "../utils/consts";

export default class User {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._id = false;
        this._isAdmin = false;
        this._themeMode = localStorage.getItem('themeMode') || "light";
        this._themeColors = this._themeColors = this._themeMode === "dark" ? darkThemeColors : lightThemeColors;
        this._selectedType = {};
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setIsAdmin(bool) {
        this._isAdmin = bool;
    }

    setUser(bool) {
        this._isAuth = bool;
    }

    setId(id) {
        this._id = id;
    }

    setThemeMode() {
        this._themeMode = this._themeMode === "dark" ? "light" : "dark";
        this._themeColors = this._themeMode === "dark" ? darkThemeColors : lightThemeColors;
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    get themeMode() {
        return this._themeMode
    }

    get themeColors() {
        return this._themeColors
    }

    get isAuth() {
        return this._isAuth;
    }

    get isAdmin() {
        return this._isAdmin;
    }

    get user() {
        return this._user;
    }

    get id() {
        return this._id;
    }

    get selectedType() {
        return this._selectedType
    }
}