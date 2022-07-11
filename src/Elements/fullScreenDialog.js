import React, { useTransition } from "react";
import { Transition } from "react-transition-group";
import "../css/fullscreen-dialog.css"
export default function FullScreenDialog(props) {
    return (
        <Transition in={props.show} timeout={(props.transitionDuration) ? props.transitionDuration : 400}>
            {(state) => {
                return (<div style={{ transitionDuration: props.transitionDuration }} className={"fullscreen-dialog " + state}>
                    {props.children}
                </div>)
            }}
        </Transition>
    )
}