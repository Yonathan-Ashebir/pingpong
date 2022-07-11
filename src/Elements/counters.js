import React, { useEffect, useState } from "react";
import anime from "animejs"
import "../css/counters.css"
import toPX from "to-px";
import $ from "jquery"

export function BigCounter(props) {
    let step = Math.sign(props.to - props.from)
    let loop = Math.abs(props.to - props.from)
    let [context] = useState({ count: props.from })

    let countFunc = () => { context.count += step; context.element.firstElementChild.innerHTML = "" + context.count; }
    let completeFunc = () => { context.element.style.visibility = "none"; if (props.onCompete) props.onCompete() }
    let counter = <span className="big-counter" ref={(el) => { context.element = el }}><span className="count">{context.count}</span></span>

    useEffect(() => {
        if (!context.rendered) {
            context.rendered = true;
            context.c = () => {
                if (props.to - step === context.count) {
                    if (props.message) {
                        context.element.firstElementChild.innerHTML = ""
                        context.element.append(props.message);
                        context.element.style.transitionDuration = `0ms`
                        context.element.style.opacity = '1'
                        if (props.onCompete) setTimeout(completeFunc, props.messageTime);
                    } else if (props.onCompete) completeFunc();
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
                                setTimeout(context.c, props.timePerDigit)
                            })
                       
                    });

                }
            }
            context.element.style.transition = `transform ${props.timePerDigit}ms, opacity ${props.timePerDigit}ms`
            requestAnimationFrame(() => {
                context.element.style.opacity = '0'
                context.element.style.transform = 'scale(3)'
                requestAnimationFrame(() => {
                    setTimeout(context.c, props.timePerDigit)
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
    messageTime: 800
}
export function SmallCounter(props) {
    let [context] = useState({ count: props.from });
    let counter = <span className="small-counter" ref={(el) => { context.element = el }}>{props.from}</span>;
    useEffect(() => {
        let step = Math.sign(props.to - props.from)
        let loop = Math.abs(props.to - props.from)

        if (!context.rendered) {
            context.rendered = true;
            let completeFunc = () => { Object.assign(context.element.style, props.countDoneStyle); if (props.onCompete) props.onCompete() }
            let anim = anime.timeline({ targets: context.element, innerHTML: [props.from, props.to], duration: props.timePerDigit * loop, easing: `steps(${loop})`, delay: props.timePerDigit })
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
    countDoneStyle: {}
}