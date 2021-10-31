import illustrationImg from '../assets/imagens/illustration.svg'
import logoImg from '../assets/imagens/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import {database} from '../services/firebase'
import useAuth from '../hooks/MyContext'

export function NewRoom(){
  const [newRoom, setNeewRoom]= useState('')
  const { user } = useAuth()
  const history = useHistory()

  async function handleCreateRoom(e: FormEvent){
    e.preventDefault()

    if(newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({ // push para lista, e set para informacoes unicas
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              value={newRoom}
              onChange={e=>setNeewRoom(e.target.value)}
            />
            <Button type='submit'>Criar sala</Button>

          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}
