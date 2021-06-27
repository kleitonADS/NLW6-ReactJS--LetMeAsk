import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode'

import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useEffect } from 'react';

type FirebaseQuestions = Record<string, {

    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHigthlighted: boolean;
}>

type Question ={
    id: string;  
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHigthlighted: boolean;
}

type RoomParams = {
    id: string;
}



export function Room() {

    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId  = params.id;
    const [ newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions ] = useState<Question[]>([]);
    const [ title, setTitle] = useState('')

    useEffect(() =>{
        
        const roomRef = database.ref(`rooms/${roomId}`);
        
        roomRef.on('value', room =>{
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            
            const parsedQuestions = Object.entries( firebaseQuestions ).map(([key, value]) =>{
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHigthlighted: value.isHigthlighted,
                    isAnswered: value.isAnswered,
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });

    }, [roomId]);

    async function HandleSendQuestion(event: FormEvent) {

        event.preventDefault();
        if(newQuestion.trim() === ''){
            return;
        }

        if(!user){
            throw new Error('You most be logged in.');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHigthlighted: false,
            isAnswered: false,

        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
        
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt=" Logo LetMeAsk"/>
                    <RoomCode code={roomId}/>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Room - {title}</h1>
                    { questions.length > 0 && <span>{ questions.length } Question(s)</span>  }
                    
                </div>

                <form onSubmit={HandleSendQuestion}>
                    <textarea
                        placeholder="What do you want to ask?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}

                    />
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name}  />
                                <span>{user.name}</span>
                            </div>
                        ) : (

                            <span>To submit a question, <button> please login</button>.</span>
                        )}
                        
                        <Button type="submit" disabled={!user} >Send Question</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}