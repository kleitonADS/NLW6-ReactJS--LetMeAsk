import iconCopy from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
    code: string;

}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomToClipboard(){
        navigator.clipboard.writeText(props.code);

    }

    return(
        <button className="room-code" onClick={copyRoomToClipboard}>
            <div>
                <img src={iconCopy} alt="icon copy" />
            </div>
            <span>Room #{props.code}</span>
            
        </button>

    )
}