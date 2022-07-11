import anime from "animejs";

export default function TwoFactionsBar(props) {
    let colorOne = props.colorOne ? props.colorOne : "red"
    let colorTwo = props.colorTwo ? props.colorTwo : "blue"
    let factionOne = props.factionOne ? props.factionOne : 0;
    let factionTwo = props.factionTwo ? props.factionTwo : 0;
    if(factionOne==0&&factionTwo==0)factionOne= factionTwo=1;
   let context ={}
    let bar =
        <span className="faction-container">
            <span ref={((el) => context.factionOne = el).bind(context)} className="faction" style={{ backgroundColor: colorOne }} />
            <span className="faction" style={{ backgroundColor: colorTwo }} />
        </span>;
    anime({
        targets: context.factionOne,
        width: ["50%", factionOne/(factionOne+factionTwo)*100+"%"],
        direction: 'forward',
        easing: 'spring(1, 80, 5, 0)',
        duration: 800
    });
    return bar
}

