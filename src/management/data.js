import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Vector } from "y-lib/LayoutBasics";
//runtime constants
export const DEFAULT_RACKET_LENGTH = 75.6, DEFAULT_RACKET_THICKNESS = 30.2, DEFAULT_BALL_RADIUS = 15.1, DEFAULT_BALL_TRANSFORM = "translate(-50%,-50%) ",
    DEFAUlT_GAME_STARTED_MESSAGE = <span style={{ color: "darkgreen", fontWeight: 700, fontFamily: "cursive", fontSize: "12vw" }}>GO!</span>;

export const gameTypes = { SCORE: 0, LEAD_BY: 1, TIME_OUT: 2 }
export const Player = React.createContext(null)
function shareReducer(store, action) {
    if (action && action.type === "share") {
        return { ...store, ...(action.payload) }
    } else return store;
}

export function mapStoreToProp(store) {
    return { store: store }
}
export function mapDispatchToProp(dispatch) {
    return { dispatch: dispatch }
}
//runtime getters
export function getStore() {
    let store = configureStore({      //Possible: Alternate use of slices and middleware composers...
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    // Ignore these action types
                    ignoredActions: ['share'],
                    // Ignore these field paths in all actions
                    ignoredActionPaths: ['payload'],
                    // Ignore these paths in the state
                    ignoredPaths: ['groundDimensions'],
                }
            }),
        reducer: shareReducer
    });
    return store;
}
//shared libraries
export const untrackedGameData = {

};
//preference getters
export function getInitialVelocity() {//todo: relate with prefs
    return new Vector(0.1, 0.1)
}
export function getGameType() {
    return gameTypes.SCORE
}
export function getAppreciationMessage() {
    return "Nice Game!"
}
export function getTargetScore() {
    return 5;
}
export function getTargetLead() {
    return 3;
}
export function getGameDurationSeconds() {
    return 60;
}
export function getMaximumDurationSeconds() {
    return 999;
}
export function getMaximumVelocity() {
    return new Vector(0.4, 0.4)
}
export function getVelocityRefreshTimeSeconds() {
    return 10;
}
export function getDifficulty() {
    return 1;
}
export function getAllowedTargetLeads() {
    return [2, 3, 4, 5]
}
export function getAllowedTargetScores() {
    return Array(10).filter((val) => val >= 3)
}
export function getAllowedGameDurationsSeconds(){
    return Array(6).map((val)=>20*(val+1))
}
//preference setters 
export function setGameType(type) {
   
}
export function setDifficulty(level) {

}
export function contact() {

}
export function setTotalDurationSeconds() {

}
export function setTargetScore() { }
export function setTargetLead() { }