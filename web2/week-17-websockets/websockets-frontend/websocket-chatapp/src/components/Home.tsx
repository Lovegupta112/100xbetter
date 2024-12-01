import  { useContext} from 'react';
import Room from './Room';
import { ChatContext } from '../context/ChatContext';
import { ChatContextType } from '../types/chat';
import Chat from './Chat';

const Home = () => {

  const {isCreatedRoom}=useContext(ChatContext) as ChatContextType;


  return (
    <div className='h-full flex flex-col justify-center items-center'>
       {isCreatedRoom ? <Chat></Chat> : <Room/>} 
    </div>
  )
}

export default Home;