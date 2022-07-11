import React from "react";
import { connect } from "react-redux";
import "../css/game.css";
import { mapDispatchToProp, mapStoreToProp, Player, untrackedGameData } from "../management/data";
import Ball from "./ball";
import { PlayerField } from "./playerField";
class Ground extends React.Component {
    constructor(params) {
        super(params);
        this.state = {}
        untrackedGameData.ground=this;
    }
    render() {
        let style = { filter: (this.props.store?.status == "paused") ? "blur(2px) brightness(50%)" : "" }
        return (
            <div id="ground" ref={(el) => this.element = el} style={style} onClick={()=>untrackedGameData.controls.toggle()} onDoubleClick={untrackedGameData.game.pauseGame}>
                <Player.Provider value={{}}>
                    <PlayerField position={"top"} />
                </Player.Provider>
                <Player.Provider value={{}}>
                    <PlayerField position={"bottom"} />
                </Player.Provider>
                <Ball></Ball>
            </div>)
    }
    componentDidMount(){
          this.element.onresize=untrackedGameData.game.trackGroundSize
    }

    checkBall = (ball) => {
        let rect = this.props.store.groundDimensions;
        let pos = ball.getCenter()
        if (pos.x - ball.getRadius() < rect.left) ball.getVelocity().setX(Math.abs(ball.getVelocity().getX()));
        else if (pos.x + ball.getRadius() > rect.right) ball.getVelocity().setX(Math.abs(ball.getVelocity().getX()) * -1);

        if (pos.y - ball.getRadius() < rect.top) ball.getVelocity().setY(Math.abs(ball.getVelocity().getY()));
        else if (pos.y + ball.getRadius() > rect.bottom) ball.getVelocity().setY(Math.abs(ball.getVelocity().getY()) * -1);

    }
    getDimensions = () => {
      return this.element?.getBoundingClientRect()
    }
}
export default connect(mapStoreToProp, mapDispatchToProp)(Ground)