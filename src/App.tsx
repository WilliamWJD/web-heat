import { useContext } from 'react';
import styled from './App.module.scss';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContext } from './contexts/Auth';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <main className={`${styled.contentWrapper} ${!!user ? styled.contentSigned : ''}`}>
      <MessageList/>
      {!!user ? <SendMessageForm/> : <LoginBox/>}
    </main>
  )
}

export { App }
