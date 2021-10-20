import styled from './App.module.scss';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';

function App() {
  return (
    <main className={styled.contentWrapper}>
      <MessageList/>
      <LoginBox/>
    </main>
  )
}

export { App }
