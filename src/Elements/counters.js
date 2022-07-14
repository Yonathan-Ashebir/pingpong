import anime from "animejs";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import "../css/counters.css";

export function BigCounter(props) {
    let step = Math.sign(props.to - props.from)
    let loop = Math.abs(props.to - props.from)
    let [context] = useState({ count: props.from })

    let countFunc = () => { context.count += step; context.element.firstElementChild.innerHTML = "" + context.count }
    let completeFunc = () => {
        context.element.style.visibility = "none";
        if (props.onComplete) props.onComplete();
    }
    let counter = <span style={props.style} className={`big-counter ${props.className}`} id={props.id} ref={(el) => { context.element = el }}><span className="count"></span></span>

    useEffect(() => {
        if (!context.rendered) {
            context.rendered = true;
            context.c = () => {
                if (props.to - step === context.count) {
                    if (props.message) {
                        context.element.firstElementChild.innerHTML = ""
                        ReactDOM.createRoot(context.element).render(props.message)
                        context.element.style.transitionDuration = `0ms`
                        context.element.style.opacity = '1'
                        if (props.onComplete) setTimeout(completeFunc, props.messageTime);
                    } else if (props.onComplete) completeFunc();
                } else {
                    countFunc();//todo why innerHTML update occurs only here in entered unfinished but ready loop mode.
                    context.element.style.transition = `none`
                    context.element.style.transform = "none"
                    context.element.style.opacity = '1'
                    requestAnimationFrame(() => {
                        context.element.style.transition = `transform ${props.timePerDigit}ms, opacity ${props.timePerDigit}ms`

                        context.element.style.opacity = '0'
                        context.element.style.transform = 'scale(3)'
                        requestAnimationFrame(() => {
                            setTimeout(() => requestAnimationFrame(context.c), props.timePerDigit)
                        })
                    });
                }
            }
            requestAnimationFrame(() => {
                context.element.firstElementChild.innerHTML = "" + context.count
                context.element.style.transition = `transform ${props.timePerDigit}ms, opacity ${props.timePerDigit}ms`
                requestAnimationFrame(() => {
                    context.element.style.opacity = '0'
                    context.element.style.transform = 'scale(3)'
                    setTimeout(() => requestAnimationFrame(context.c), props.timePerDigit)

                })
            })

        }

    })
    //todo: props are inheritable but targets are not!
    return counter;

}
BigCounter.defaultProps = {
    from: 8,
    to: 0,
    timePerDigit: 2000,
    messageTime: 800,
}
export function SmallCounter(props) {
    let [context] = useState({ count: props.from });
    let counter = <span style={props.style} className={`small-counter ${props.className}`} id={props.id}ef={(el) => { context.element = el }}></span>;
    useEffect(() => {
        if (!context.rendered) {
            context.rendered = true;
            let step = Math.sign(props.to - props.from)
            let loop = Math.abs(props.to - props.from) + 1
            let completeFunc = () => {
                Object.assign(context.element.style, props.countDoneStyle);
                if (props.onComplete) props.onComplete()
            }
            let anim = anime({ targets: context.element, innerHTML: [props.from - step, props.to], duration: props.timePerDigit * loop, round: 1, easing: `steps(${loop})` })
            anim.complete = completeFunc
        }
    })
    //todo: props are inheritable but targets are not!
    return counter;
}

SmallCounter.defaultProps = {
    from: 0,
    to: 3,
    timePerDigit: 200,
    countDoneStyle: {},
}