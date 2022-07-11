import { red } from "@mui/material/colors";
import React from "react";
import { connect, useSelector } from "react-redux";
import Controls from "../Elements/controls";
import { BigCounter, SmallCounter } from "../Elements/counters";
import FullScreenDialog from "../Elements/fullScreenDialog";
import Ground from "../Elements/ground";
import Suspend from "../Elements/suspendDialog";
import TwoFactionsBar from "../Elements/twoFactionsBar";
import { WinnerDialog } from "../Elements/winnerDialog";
import { DEFAUlT_GAME_STARTED_MESSAGE, getAppreciationMessage, getInitialVelocity, mapDispatchToProp, mapStoreToProp, untrackedGameData } from "./data";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch({ type: "share", payload: { status: "launched" } })
        untrackedGameData.game = this;
    }

    render() {
        setTimeout(() => { window.mStore = this.props.store; window.untracked = untrackedGameData }, 100)
      let status = this.props.store?.status, winnerName =this.props.store?.winnerName
        let score;
        if (status === "won") {
            let countDoneStyle = {
                animationDuration: "800ms",
                animationTimingFunction: "ease-out",
                animation: "small-counter-anim"
            }
            score = (
                <div className="score-container">
                    <SmallCounter from={0} to={score.red} countDoneStyle={{ ...countDoneStyle, color: "red" }} />
                    <TwoFactionsBar factionOne={score.red} factionTwo={score.blue} />
                    <SmallCounter from={0} to={score.blue} countDoneStyle={{ ...countDoneStyle, color: "blue" }} />
                </div>
            )
        }
        return (<>
            <Ground />
            <Controls type={this.props.gameType} />
            <FullScreenDialog show={status === "launched" || status === "won"}>
                {(status === "launched") ? (
                    <BigCounter /* from={3} to={0}  */message={null/* DEFAUlT_GAME_STARTED_MESSAGE */} onComplete={()=>{}}></BigCounter>
                ) : null}
                {(status === "won") ? (
                    <WinnerDialog winner={<span class="winner-name">{(winnerName) ? winnerName : "winner name"}</span>} score={score} message={(score.red == score.blue) ? getAppreciationMessage() : "WINS"}></WinnerDialog>
                ) : null}
            </FullScreenDialog>
            <Buttons />
        </>);
    }
    componentDidMount() {
        this.trackGroundSize();
        document.body.onresize = this.trackGroundSize;
    }
    componentDidUpdate() {

    }
    checkBall = () => {
        let { topRacket, bottomRacket, ground, ball } = untrackedGameData;
        topRacket.checkBall(ball);
        bottomRacket.checkBall(ball);
        ground.checkBall(ball);
    }
    startGame = () => {
        //todo: some kind of loaded check
        let v = getInitialVelocity();
        v.rotate(Math.random() * 2 * Math.PI)
        this.props.dispatch({ type: "share", payload: { gameStartTime: new Date().getTime(), status: "starting" } });
        setTimeout(() => this.props.dispatch({ type: "share", payload: { status: "playing", score: { blue: 4, red: 3, max: 5 } } }), 10)//todo: another buggy react issue
    }
    pauseGame = () => {
        let interval = new Date().getTime() - this.props.store.gameStartTime
        this.props.dispatch({ type: "share", payload: { gameTimeBeforePause: interval, status: "pausing", gameStartTime: null } })
        setTimeout(() => this.props.dispatch({ type: "share", payload: { status: "paused" } }), 10)
    }
    resumeGame = () => {
        if (!(this.props.store.status === "paused")) return
        let newGameStartTime = new Date().getTime() - this.props.store.gameTimeBeforePause
        this.props.dispatch({ type: "share", payload: { gameStartTime: newGameStartTime, status: "resuming" } })
        setTimeout(() => this.props.dispatch({ type: "share", payload: { gameTimeBeforePause: null, status: "playing" } }), 10)
    }
    exitGame = () => { }
    trackGroundSize = () => {
        let dimen = untrackedGameData.ground.getDimensions()
        if (dimen) {
            this.props.dispatch({ type: "share", payload: { groundDimensions: dimen } })
        }
    }
}
function Buttons(props) {
    let { game } = untrackedGameData
    let btns = []
    for (let key in game) {
        if (typeof game[key] === "function") {
            btns.push(<button key={key} onClick={game[key]}>
                {key}
            </button>)
        }
    }

    return (
        <div style={{ position: "absolute", bottom: "2px" }}>
            {btns}
        </div>
    )
}

export default connect(mapStoreToProp, mapDispatchToProp)(Game);