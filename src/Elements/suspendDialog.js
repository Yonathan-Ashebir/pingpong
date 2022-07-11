import { Button } from "@mui/material"
import { useSelector } from "react-redux"
import { untrackedGameData } from "../management/data"
export default function Suspend(props) {
    let {game} = untrackedGameData
    return (
        <div className="suspend-dialog">
            <Button variant="outlined" color="primary" onClick={game.resumeGame}><span className="material-icons">play_arrow</span>Resume</Button>
            <Button variant="outlined" color="warning" onClick={game.exitGame}><span className="material-icons">close</span>Exit</Button>    
        </div>
    )
}