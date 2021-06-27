import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { database } from '../services/firebase';


import { useAuth } from '../hooks/useAuth';


export function NewRoom() {

    const { user } = useAuth();
    const [ newRoom, setNewRoom ] = useState('');
    const history = useHistory();
  
    async function handleCreateRoom( event: FormEvent) {
       
      event.preventDefault();

      if(newRoom.trim() === ''){
        return
      }

      const roomRef = database.ref('rooms');
      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
      })

      history.push(`/room/${firebaseRoom.key}`)
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
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Room name"
              onChange = {event => setNewRoom(event.target.value) }

            />
            <Button type="submit">
             Create room
            </Button>

          </form>
          <p>Want to join an existing room?</p><Link to="/">Click here </Link>
        </div>
        


      </main>
      


      </div>
  )
}
