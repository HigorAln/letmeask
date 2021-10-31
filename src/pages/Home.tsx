import {useHistory} from 'react-router-dom'
import useGlobalContext from '../hooks/MyContext'

import illustrationImg from '../assets/imagens/illustration.svg'
import logoImg from '../assets/imagens/logo.svg'
import googleIconImg from '../assets/imagens/google-icon.svg'
import { Button } from '../components/Button'

import '../styles/auth.scss'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function Home(){
  const {user, signInWithGoogle} = useGlobalContext()
  const history = useHistory()
  const [roomCode, setRoomCode] = useState('')


  const handleCreateRoom=async()=>{
    if(!user){
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(e: FormEvent){
    e.preventDefault();

    if(roomCode.trim() === ''){
      return
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()){
      alert('Room does not exists')
      return;
    }

    if(roomRef.val().endedAt){
      alert('Room already closed.')
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return(
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt="Illustração simbolizando perguntas e responstas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className='create-room' onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator" >ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o codigo da sala'
              onChange={e=>setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type='submit'>Entrar na sala</Button>
          </form>

        </div>
      </main>
    </div>
  )
}
