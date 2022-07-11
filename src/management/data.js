import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Vector } from "y-lib/LayoutBasics";
//constants
export const DEFAULT_RACKET_LENGTH = 75.6, DEFAULT_RACKET_THICKNESS = 30.2, DEFAULT_BALL_RADIUS = 15.1, DEFAULT_BALL_TRANSFORM = "translate(-50%,-50%) ", DEFAUlT_GAME_STARTED_MESSAGE= "GO!";

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

//getters
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
export function getInitialVelocity() {//todo: relate difficulty
    return new Vector(0.05, 0.05)
}

export function getGameType() {
    return "score"
}
export function getAppreciationMessage(){
    return "Nice Game!"
}
//shared libraries
export const untrackedGameData = {

};

