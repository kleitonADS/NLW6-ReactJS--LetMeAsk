
import { useHistory } from 'react-router-dom'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';



import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'




export function Home() {

  const history = useHistory();
  const { user, signWithGoogle } = useAuth();

  async function handleCreateRoom(){
    if(!user){
      await signWithGoogle();
      
    }

    history.push('/room/new');

     
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
          <form>
            <input
              type="text"
              placeholder="Enter the room code"

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
