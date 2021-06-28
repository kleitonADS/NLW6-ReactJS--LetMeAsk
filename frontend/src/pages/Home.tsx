
import { useHistory } from 'react-router-dom'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';



import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';






export function Home() {

  const history = useHistory();
  const { user, signWithGoogle } = useAuth();
  const [ roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){
    if(!user){
      await signWithGoogle();
      
    }

    history.push('/room/new');
     
  }

  async function handleJoinRoom(event: FormEvent) {
   event.preventDefault();
    
    if(roomCode.trim() === ''){
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert(`Hi ${user?.name}, This room does not exits.`);
      return;
    }
    if(roomRef.val().endedAt){
      alert('Room Already closed.');
      return;
    }

    history.push(`/room/${roomCode}`);
  
  }

  return(
    
      <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="questions and answers illustration"/>
        <strong>Create live Q&amp;A room</strong>
        <p>Ask your audience's questions in real time.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo let me ask" />
          <button onClick={handleCreateRoom}  className="create-room">
            <img src={googleIconImg} alt="Google icon" />
            Create your room with google
          </button>
          <div className="separator"> Or access a room </div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Enter the room code"
              onChange={ event=> setRoomCode(event.target.value)}
              value={roomCode}

            />
            <Button type="submit">
              Enter the room
            </Button>

          </form>
        </div>
        


      </main>
      


      </div>
  )
}
