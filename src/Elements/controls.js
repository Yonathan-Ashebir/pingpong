import { CircularProgress, LinearProgress } from "@mui/material";
import { extend } from "jquery";
import React from "react";
import { connect } from "react-redux"
import { mapDispatchToProp, mapStoreToProp, untrackedGameData } from "../management/data";
import $ from "jquery"
class Controls extends React.Component {
    constructor(props) {
        super(props)
        untrackedGameData.controls = this;
        this.state = { visible: false }
    }
    render() {
        let style = {}
        let score = { blue: 0, red: 0, max: 0 }
        if (this.props.store && this.props.store.score) { score = this.props.store.score }
        return (
            <div style={{}} id="controls" ref={(el) => this.element = el}>
                {
                    (this.props.type == "score") ? (
                        <>
                            <div className="scoreDisplay">
                                <CircularProgress variant="determinate" value={score.blue / score.max * 100} about="player 1" color="primary" className="scoreDisplay"></CircularProgress>
                                <p>{score.blue}</p>
                            </div>
                            <GameTimer />
                            <div className="scoreDisplay">
                                <CircularProgress variant="determinate" value={score.red / score.max * 100} about="player 1" color="warning" className="scoreDisplay">55</CircularProgress>
                                <p>{score.red}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <GameTimer />
                            <progress style={{ width: "50%" }} color={(score.blue > score.red) ? "blue" : "orange"} value={Math.abs(score.blue - score.red) / score.max}></progress>
                        </>

                    )
                }

            </div>
        );
    }
    componentDidMount() {
        this.show();
        setTimeout(this.hide,2000)
    }
    show = () => {
        $(this.element).removeClass("hiding").addClass("shown")
        this.state.visible = true;
    }
    hide = () => {
        let $element = $(this.element).removeClass("shown").addClass("hiding")
        setTimeout((() => { $element.removeClass("hiding") }), 300)
        this.state.visible = false;
    }
    toggle = () => {
        if (this.state.visible) this.hide(); else this.show();
    }
}
class _GameTimer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { time: 0, type: "timer", timerClassName: "visible", pauseClassName: "" }
    }
    render() {
        if (!this.props.store || !this.props.store.gameStartTime || this.props.store.status === "launched") return (<p className="game-timer">{this.state.time}</p>);
        let { gameStartTime, status ,gameTotalDuration} = this.props.store
        this.state.time = Math.round((new Date().getTime() - gameStartTime) / 1000)
        if (Math.floor(this.state.time / 5) % 2 == 0||(this.props.gameType==="time"&&gameTotalDuration-this.state.time<10)) {
            this.state.timeClassName = "visible"
            this.state.pauseClassName = ""
        } else {
            this.state.timeClassName = ""
            this.state.pauseClassName = "visible"
        }
        if (status === "playing") {
            let refresh = (() => this.forceUpdate()).bind(this)
            setTimeout(refresh, 1000)
        }
       
        return (
            <div id="game-timer" style={{ position: "relative", height: "fit-content" }} onClick={untrackedGameData.game.pauseGame} className={(status==="playing")?"active":""}>
                <span  className={this.state.timeClassName}>{this.state.time}</span>
                <span style={{fontSize:"12mm"}}className={this.state.pauseClassName + " centered material-icons"}>pause_circle</span>
            </div>
        )
    }
}


const GameTimer = connect(mapStoreToProp, mapDispatchToProp)(_GameTimer)

export default connect(mapStoreToProp, mapDispatchToProp)(Controls)
