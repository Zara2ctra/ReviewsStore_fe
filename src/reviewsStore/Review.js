import {makeAutoObservable} from "mobx";

export default class Review {
    constructor() {
        this._type = [

        ]
        makeAutoObservable(this)
    }

}