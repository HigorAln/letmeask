import copyImg from '../assets/imagens/copy.svg';
import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode({code}: RoomCodeProps){
  function copyRoomCodeToClipBoad(){
    navigator.clipboard.writeText(code)
  }

  return(
    <button className="room-code" onClick={copyRoomCodeToClipBoad}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  )
}
