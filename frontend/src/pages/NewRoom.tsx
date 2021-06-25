import { Link } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'


import '../styles/auth.scss'
import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';


export function NewRoom() {

  // const { user } = useAuth;
  

  
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
          <form>
            <input
              type="text"
              placeholder="Room name"

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
