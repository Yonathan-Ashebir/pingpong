import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Paper, Slider, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material"
import React from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import "../css/home.css"
import { contact, gameTypes, getDifficulty, getGameType, getTargetLead, getTargetScore, getGameDurationSeconds, setDifficulty, setGameType } from "../management/data"
import game from "../management/game"
import { Navigate } from "react-router"
export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameType: getGameType(),
            difficulty: getDifficulty(),
            status: "opened", contactDialogOpened: false,
            countDialogOpened: false,
            gameTotalDurationSeconds: getGameDurationSeconds(),
            gameTargetScore: getTargetScore(),
            gameTargetLead: getTargetLead()
        };
    }
    render() {
        if (this.state.status === "entering game") {
            return <Navigate to="/game"></Navigate>
        }
        console.log(this.state)
        return (
            <div id="home">
                <Stack spacing={3} alignItems="center" id="main">
                    <Button variant="text" onClick={() => { this.setState({ status: "entering game" }) }}>
                        <Stack spacing={3} alignItems="center" >
                            <div id="logo">
                            </div>
                            <div id="phrase">phrase goes here</div>
                        </Stack>
                    </Button>

                    <div id="prefs">
                        <Paper elevation={3} id="game-type-card">
                            <div id="game-type-selector">
                                <span id="game-type-label">Game Type:&nbsp;</span>
                                <ToggleButtonGroup exclusive style={{ transitionDuration: "400ms" }} value={this.state.gameType} onChange={((ev, gameType) => { setGameType(gameType); this.setState({ gameType: gameType }) }).bind(this)}>
                                    <ToggleButton className="game-type-option" value={gameTypes.SCORE}><span className="material-icons">leaderboard</span></ToggleButton>
                                    <ToggleButton style={{ transform: "rotateX(180deg)" }} className="game-type-option" value={gameTypes.LEAD_BY}><span className="material-icons">keyboard_option_key</span></ToggleButton>
                                    <ToggleButton className="game-type-option" value={gameTypes.TIME_OUT}><span className="material-icons">timer</span></ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            <div>
                                <span style={{ width: "100%", height: 1, display: "block", backgroundColor: "silver", marginTop: "2mm" }} />
                                <SwitchTransition mode="out-in" >

                                    <CSSTransition key={this.state.gameType} classNames='details' timeout={36000}/* addEndListener={(node, call) => { node.addEventListener("transitionend", (ev) => { if (ev.propertyName === "max-height") call(ev) }, false) }}  */>
                                        <div id="game-type-detail">
                                            <dt ><span className="game-detail-title">{["Score to win", "Always be a head", "Timer"][this.state.gameType]}</span>
                                            </dt>
                                            <dd className='game-detail-content'>
                                                {["Be the first to score ", "Beat up you opponent by ", "Retain your lead until all the "][this.state.gameType]} <span onClick={this.showCountSelector} className="count-selector">{
                                                    (this.state.gameType === gameTypes.SCORE) ? this.state.gameTargetScore : (this.state.gameType === gameTypes.LEAD_BY) ? this.state.gameTargetLead : this.state.gameTotalDurationSeconds
                                                } </span>{[" in order to win.", " point to win.", "ms are all up."][this.state.gameType]}
                                            </dd>
                                        </div>
                                    </CSSTransition>
                                </SwitchTransition>
                            </div>
                        </Paper>
                        <div height={30}></div>
                        <Paper elevation={3} id="difficulty-card" >
                            <span id="difficulty-label">Difficulty:&nbsp;</span>
                            <Slider
                                // aria-label="diff-aria"
                                // getAriaValueText={(v) => { }} 
                                defaultValue={this.state.difficulty}
                                valueLabelDisplay="auto"
                                marks={[1, 2, 3, 4, 5]}
                                min={0}
                                max={5}
                                onChange={((ev, val) => { setDifficulty(val); this.setState({ difficulty: val }) }).bind(this)}
                            />
                        </Paper>

                    </div>
                </Stack>
                <Stack direction={"horizontal"} id="bottom-bar">
                    <span id="version">version 1.0.0</span>
                    <Button id="contact" onClick={this.showContactDialog}><span className="material-icons">mail</span>&nbsp;contact me</Button>
                </Stack>
            </div>
        )
    }
    showContactDialog = () => {
        let openURL = () => { }//todo
        return (
            <Dialog open={this.state.contactDialogOpened}>
                <DialogActions>
                    <Button variant="text" color="primary" onClick={(() => { this.setState({ contactDialogOpened: false }) }).bind(this)}>CLOSE</Button>
                </DialogActions>
            </Dialog>
        )
    }
    showCountSelector = () => {
        let setCount = (count) => {

        }
        return (
            <Dialog open={this.state.countDialogOpened}>//todo
                <DialogTitle>
                    {(this.state.gameType === gameTypes.SCORE) ? "Choose your target score" : (this.state.gameType === gameTypes.LEAD_BY) ? "Decide how far a head the winner should be" : this.state.gameTotalDurationSeconds}
                </DialogTitle>
                <DialogContent>
                    <Input type="number" style={{ width: "60vw" }}></Input>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="primary" onClick={(() => { this.setState({ countDialogOpened: false }) }).bind(this)}>CLOSE</Button>
                    <Button variant="text" color="primary" onClick={(() => { this.setState({ countDialogOpened: false }) }).bind(this)}>OK</Button>
                </DialogActions>
            </Dialog>
        )
    }
}